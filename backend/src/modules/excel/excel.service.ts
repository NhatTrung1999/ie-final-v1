import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs';
import {
  cellConfigurations,
  cellTimeStudy,
  defaultAlignment,
  defaultBorder,
  defaultFill,
  defaultFont,
} from './constants';
import { CTData, Section, TimeStudyData } from './types';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { ITablectData, ITablectType } from 'src/types/tablect';

@Injectable()
export class ExcelService {
  constructor(@Inject('IE') private readonly IE: Sequelize) {}

  //LSA
  private applyCellConfigurations(worksheet: ExcelJS.Worksheet): void {
    const borderStyle = { style: 'thin' as ExcelJS.BorderStyle };

    cellConfigurations.forEach(({ cell, value, merge }) => {
      // Gộp ô nếu có merge
      if (merge) {
        worksheet.mergeCells(merge);

        // Xác định vùng gộp để áp dụng border
        const [startCell, endCell] = merge.split(':');
        const start = worksheet.getCell(startCell);
        const end = worksheet.getCell(endCell);
        const startRow = Number(start.row); // Ensure numeric type
        const endRow = Number(end.row); // Ensure numeric type
        const startCol = Number(start.col); // Ép kiểu
        const endCol = Number(end.col); // Ép kiểu

        // Áp dụng border cho tất cả ô trong vùng gộp
        for (let row = startRow; row <= endRow; row++) {
          for (let col = startCol; col <= endCol; col++) {
            worksheet.getCell(row, col).border = {
              top: borderStyle,
              right: borderStyle,
              bottom: borderStyle,
              left: borderStyle,
            };
            if (row === 5 || row === 6) {
              worksheet.getCell(row, col).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ccffff' },
              };
            }
          }
        }
      }

      // Ghi giá trị và định dạng cho ô
      if (cell) {
        const targetCell = worksheet.getCell(cell);
        targetCell.value = value;
        targetCell.alignment = {
          wrapText: true,
          vertical: 'middle',
          horizontal: 'center',
        };
        targetCell.font = {
          name: 'Arial',
          family: 2,
          size: 10,
          bold: true,
        };

        // Áp dụng border cho ô đơn lẻ (nếu không thuộc vùng gộp)
        if (!merge) {
          targetCell.border = {
            top: borderStyle,
            right: borderStyle,
            bottom: borderStyle,
            left: borderStyle,
          };
          if (cell.includes('5') || cell.includes('6')) {
            worksheet.getCell(cell).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ccffff' },
            };
          }
        }
      }
    });
  }

  // async exportLSA() {
  //   const workbook = new ExcelJS.Workbook();
  //   const sheet = workbook.addWorksheet('Demo Sheet');

  //   // Header row
  //   sheet.addRow(['ID', 'Name', 'Age', 'Email']);

  //   // Sample data
  //   const data = [
  //     { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  //     { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  //   ];

  //   data.forEach((item) => {
  //     sheet.addRow([item.id, item.name, item.age, item.email]);
  //   });

  //   // Styling header
  //   sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  //   sheet.getRow(1).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: '4F81BD' },
  //   };
  //   return await workbook.xlsx.writeBuffer();
  // }

  async exportLSA() {
    const records: ITablectData[] = await this.IE.query(
      `SELECT * FROM IE_TableCT`,
      {
        type: QueryTypes.SELECT,
      },
    );

    const groupedMap = new Map<string, Section>();

    for (const item of records) {
      const { No, ProgressStagePartName, Area, Nva, Va } = item;

      const vaData = JSON.parse(Va) as ITablectType;
      const nvaData = JSON.parse(Nva) as ITablectType;

      const vaAvgCT = vaData.Average;
      const nvaAvgCT = nvaData.Average;
      const totalCT = vaAvgCT + nvaAvgCT;

      if (!groupedMap.has(Area)) {
        groupedMap.set(Area, {
          title: Area,
          rows: [],
          CT: 0,
          PP: 0,
        });
      }

      const section = groupedMap.get(Area)!;

      section.rows.push({
        no: No,
        operation: ProgressStagePartName,
        va: vaAvgCT,
        nvan: nvaAvgCT,
        ct: totalCT,
      });

      section.CT += totalCT;
      section.PP =
        section.CT === 0 ? 0 : Number((27000 / section.CT).toFixed(1));
    }

    const lsaData: Section[] = Array.from(groupedMap.values());

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('LSA');
    worksheet.properties.defaultRowHeight = 24;
    worksheet.getColumn('B').width = 67;
    worksheet.getColumn('E').width = 20;
    worksheet.getColumn('J').width = 30;

    worksheet.mergeCells('A1:K1');
    worksheet.getCell('A1').value =
      'LABOR STANDARD ADVICE (Sample) \nBẢNG ĐỊNH MỨC LAO ĐỘNG -工時定量表';
    worksheet.getCell('A1').style = {
      alignment: { wrapText: true, vertical: 'middle', horizontal: 'center' },
      font: { name: 'Arial', family: 2, bold: true, size: 14 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '99ccff' } },
    };
    for (let col = 1; col <= 10; col++) {
      const cell = worksheet.getCell(1, col);
      cell.border = {
        top: { style: 'thin' },
        right: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
      };
    }
    worksheet.getRow(1).height = 42;

    this.applyCellConfigurations(worksheet);

    let startRow = 7;

    lsaData.forEach((items) => {
      // Gộp ô A và B cho tiêu đề Section
      worksheet.mergeCells(`A${startRow}:B${startRow}`);
      worksheet.getCell(`A${startRow}`).value = items.title;
      worksheet.getCell(`A${startRow}`).style = {
        font: {
          name: 'Arial',
          family: 2,
          bold: true,
          size: 10,
          color: { argb: 'FF0000' },
        },
        alignment: { vertical: 'middle' },
      };

      worksheet.getRow(startRow).height = 24;
      startRow++;

      // Ghi từng row trong items.rows
      items.rows.forEach((item) => {
        worksheet.getCell(`A${startRow}`).value = item.no;
        worksheet.getCell(`B${startRow}`).value = item.operation;
        worksheet.getCell(`C${startRow}`).value = item.va;
        worksheet.getCell(`D${startRow}`).value = item.nvan;
        worksheet.getCell(`E${startRow}`).value = item.ct;

        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach((col) => {
          worksheet.getCell(`${col}${startRow}`).style = {
            ...worksheet.getCell(`${col}${startRow}`).style,
            border: {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            },
            font: { name: 'Arial', family: 2, size: 10, bold: true },
            alignment: {
              vertical: 'middle',
              horizontal: col.includes('B') ? 'left' : 'center',
            },
          };
        });
        worksheet.getRow(startRow).height = 24;
        startRow++;
      });

      // Ghi CT
      worksheet.getCell(`D${startRow}`).value = 'CT';
      worksheet.getCell(`E${startRow}`).value = items.CT;
      ['D', 'E'].forEach((col) => {
        worksheet.getCell(`${col}${startRow}`).style = {
          ...worksheet.getCell(`${col}${startRow}`).style,
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: {
            name: 'Arial',
            family: 2,
            size: 9,
            bold: true,
            color: { argb: 'FF0000' },
          },
        };
        worksheet.getRow(startRow).height = 24;
      });
      startRow++;

      // Ghi PP
      worksheet.getCell(`D${startRow}`).value = 'PP';
      worksheet.getCell(`E${startRow}`).value = items.PP;
      ['D', 'E'].forEach((col) => {
        worksheet.getCell(`${col}${startRow}`).style = {
          ...worksheet.getCell(`${col}${startRow}`).style,
          alignment: { vertical: 'middle', horizontal: 'center' },
          font: {
            name: 'Arial',
            family: 2,
            size: 9,
            bold: true,
            color: { argb: 'FF0000' },
          },
        };
        worksheet.getRow(startRow).height = 24;
      });
      startRow++;
    });

    const total = lsaData.reduce((prev, curr) => prev + curr.CT, 0);
    worksheet.getCell(`D${startRow}`).value = 'TOTAL:';
    worksheet.getCell(`E${startRow}`).value = total;
    ['D', 'E'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: { vertical: 'middle', horizontal: 'center' },
        font: {
          name: 'Arial',
          family: 2,
          size: 9,
          bold: true,
          color: { argb: 'FF0000' },
        },
      };
      worksheet.getRow(startRow).height = 24;
    });
    startRow++;

    worksheet.getCell(`D${startRow}`).value = 'PP:';
    worksheet.getCell(`E${startRow}`).value =
      total === 0 ? 0 : Number((27000 / total).toFixed(1));
    ['D', 'E'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: { vertical: 'middle', horizontal: 'center' },
        font: {
          name: 'Arial',
          family: 2,
          size: 9,
          bold: true,
          color: { argb: 'FF0000' },
        },
      };
      worksheet.getRow(startRow).height = 24;
    });
    startRow++;

    worksheet.getCell(`B${startRow}`).value = 'Unit \n單位';
    worksheet.getCell(`B${startRow}`).style = {
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      },
      alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
      font: {
        name: 'Arial',
        family: 2,
        size: 10,
        bold: true,
      },
    };

    worksheet.mergeCells(`C${startRow}:D${startRow}`);
    worksheet.getCell(`C${startRow}`).value = 'Time(second) \n時間';
    ['C', 'D'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: {
          name: 'Arial',
          family: 2,
          size: 9,
          bold: true,
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        },
      };
      worksheet.getRow(startRow).height = 24;
    });

    worksheet.mergeCells(`E${startRow}:F${startRow}`);
    worksheet.getCell(`E${startRow}`).value = 'Pair/Person/8h \n雙數/人/8h';
    ['E', 'F'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: {
          name: 'Arial',
          family: 2,
          size: 9,
          bold: true,
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        },
      };
      worksheet.getRow(startRow).height = 24;
    });

    worksheet.mergeCells(`G${startRow}:I${startRow}`);
    worksheet.getCell(`G${startRow}`).value = 'LLER';
    ['G', 'H', 'I'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: { vertical: 'middle', horizontal: 'center', wrapText: true },
        font: {
          name: 'Arial',
          family: 2,
          size: 9,
          bold: true,
        },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        },
      };
      worksheet.getRow(startRow).height = 24;
    });

    startRow++;

    const processes = [
      { name: '(Cutting)裁斷', time: 0.0, pairPerPerson: 0, ller: 0.0 },
      { name: '(Stitching)針車', time: 0.0, pairPerPerson: 0, ller: 0.0 },
      { name: '(F+A)成型+包裝', time: 0.0, pairPerPerson: 0, ller: 0.0 },
      {
        name: '(C2B)裁斷+針車+成型+包裝',
        time: 0.0,
        pairPerPerson: 0,
        ller: 0.0,
      },
    ];

    processes.forEach((process) => {
      worksheet.getCell(`B${startRow}`).value = process.name;
      worksheet.mergeCells(`C${startRow}:D${startRow}`);
      worksheet.getCell(`C${startRow}`).value = process.time;
      worksheet.mergeCells(`E${startRow}:F${startRow}`);
      worksheet.getCell(`E${startRow}`).value = process.pairPerPerson;
      worksheet.mergeCells(`G${startRow}:I${startRow}`);
      worksheet.getCell(`G${startRow}`).value = process.ller;

      // Thêm border cho các ô
      ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].forEach((col) => {
        worksheet.getCell(`${col}${startRow}`).style = {
          ...worksheet.getCell(`${col}${startRow}`).style,
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
          alignment: {
            vertical: 'middle',
            horizontal: 'center',
          },
          font: {
            name: 'Arial',
            family: 2,
            size: 10,
            bold: true,
          },
          numFmt: col === 'G' ? '0.00%' : '',
        };
        worksheet.getRow(startRow).height = 24;
      });

      startRow++;
    });

    worksheet.getCell(`B${startRow}`).value = 'Chủ quản xưởng vụ 廠務主管';
    worksheet.mergeCells(`C${startRow}:E${startRow}`);
    worksheet.getCell(`C${startRow}`).value = 'Chủ quản hiện trường 現場主管';
    worksheet.mergeCells(`F${startRow}:I${startRow}`);
    worksheet.getCell(`F${startRow}`).value = 'Chủ quản định mức 企劃主管';
    worksheet.mergeCells(`J${startRow}:K${startRow}`);
    worksheet.getCell(`J${startRow}`).value = 'Lập biểu 制表';
    ['B', 'C', 'E', 'F', 'G', 'I', 'J', 'K'].forEach((col) => {
      worksheet.getCell(`${col}${startRow}`).style = {
        ...worksheet.getCell(`${col}${startRow}`).style,
        alignment: {
          vertical: 'middle',
          horizontal: 'center',
        },
        font: {
          name: 'Arial',
          family: 2,
          size: 10,
          bold: true,
        },
      };
      worksheet.getRow(startRow).height = 24;
    });
    startRow++;

    return await workbook.xlsx.writeBuffer();
  }

  //Time Study
  async exportTimeStudy() {
    return 'export time study';
  }
}
