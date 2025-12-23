import * as React from 'react';
import './FirstSection.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loder from '../loder/Loader';
import styles from '../MainPage/MainCoverPage.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';
import Section02 from '../Section02/Section02'
import Section_24 from '../Section02/Section_24';
import Section_25 from '../Section02/Section_25';
import Section_26 from '../Section02/Section_26';
import Section_27 from '../Section02/Section_27';
import Section_31 from '../Section03/Section_31';
import Section_32 from '../Section03/Section_32';
import Section_33 from '../Section03/Section_33';
import Section_34 from '../Section03/Section_34';
import Section_35 from '../Section03/Section_35';
import Section_41 from '../Section04/Section_41';
import Section_42 from '../Section04/Section_42';
import Section_43 from '../Section04/Section_43';
import Section_44 from '../Section04/Section_44';
import Section_51 from '../Section05/Section_51';
import Section_521 from '../Section05/Section_521';
import Section_61 from '../Section06/Section_61';
import Section_71 from '../Section07/Section_71';
import Section_72 from '../Section07/Section_72';
import * as XLSX from "xlsx-js-style"
import { saveAs } from "file-saver";
import Section_45 from '../Section04/Section_45';
import Section_522 from '../Section05/Section_522';
import Section_53 from '../Section05/Section_53';
import Section_54 from '../Section05/Section_54';
import Section_55 from '../Section05/Section_55';
import Section_56 from '../Section05/Section_56';
import Section_57 from '../Section05/Section_57';
import Section_58 from '../Section05/Section_58';
import Section_59 from '../Section05/Section_59';
import Section_510 from '../Section05/Section_510';
import Section_62 from '../Section06/Section_62';
import FDSection from '../FD_Section/FDSection';
//import pdfIcon from '../../assets/file.png';

const pdfIcon: string = require('../../../propertySurveyExportPdf/assets/file.png');
const excelIcon: string = require('../../../propertySurveyExportPdf/assets/excel.png');

interface ListItem {
    SealStructure: any;
    BusinessEntity: string | number | readonly string[] | undefined;
    QuantitativeData: any;
    PropertyDetails: any;
    OData__x0037__x002e_2: string;
    OData__x0037__x002e_1: string;
    OData__x0036__x002e_1: string;
    OData__x0035__x002e_2: string;
    OData__x0035__x002e_1: string;
    OData__x0034__x002e_4: string;
    OData__x0034__x002e_5: string;
    OData__x0034__x002e_3: string;
    OData__x0034__x002e_2: string;
    Environmental: string;
    InformationOperation: string;
    OperationalTests: string;
    PeriodicExaminations: string;
    CorrectnessTests: string;
    PropertyPlans: string;
    EngagementAgreements: string;
    Payments8: any;
    Payments7: any;
    Payments6: any;
    Payments5: any;
    Payments4: any;
    Payments3: any;
    Payments2: any;
    Payments1: any;
    Form_ID: string | number | readonly string[] | undefined;
    Date: any;
    Names1: string;
    Names2: string;
    ResponsibleOps: string;
    NumberofOps: string;
    SystemProperty: string;

    OData__x0035__x002e_2_x002e_2: string;
    OData__x0035__x002e_2r: string;
    OData__x0035__x002e_9: string;
    OData__x0035__x002e_8: string;
    OData__x0035__x002e_7: string;
    OData__x0035__x002e_6: string;
    OData__x0035__x002e_5: string;
    OData__x0035__x002e_4: string;
    OData__x0036__x002e_2: string;

    FindingText: string
    LeaseExpirationDate: string | Date
    ContractNumber: string | any
}

interface FirstSectionProps {
    listitems: ListItem;
    property_subject_Data: any;
    property_Frequency_Data: any;
    SPLibraryName: string | undefined;
    form_Id: number;
}

interface PropertySubjectItem {
    Area: unknown;
    Subject: any;
    Chapter: string;
    Order0: string | number;
    frequencylpId: any;
}

const AvivAppLogologo = require('../Image/AvivAppLogo.jpg')
const AvivLogo = require('../Image/AvivLogo.png')

export const FirstSection: React.FC<FirstSectionProps> = ({ listitems, property_subject_Data, property_Frequency_Data, SPLibraryName, form_Id }) => {


    // List of chapter codes to filter and group property subject data
    const chapterList = ["2,1", "2,2", "2,3", "2,4", "2,5", "2,7", "4,4", "3,1", "3,2", "3,3", "3,4", "3,5", "4,1", "4,2", "4,3", "4,4", "5,1", "5,2", "5,2,1", "5,2,2", "5,3", "5,4", "5,5", "5,6", "5,7", "5,8", "5,9", "6,1", "6,2", "7,1", "7,2"];

    // Create a map of chapter-wise grouped subject data
    const chapterDataMap: Record<string, Array<PropertySubjectItem>> = chapterList.reduce(
        (acc, chapter) => {
            acc[chapter] = property_subject_Data?.filter((x: PropertySubjectItem) => x.Chapter === chapter);
            return acc;
        },
        {} as Record<string, Array<PropertySubjectItem>>
    );

    // If required data is missing, return null to avoid rendering
    if (!listitems) {
        return null;
    }
    if (!property_subject_Data) {
        return null;
    }

    const [isLoading, setIsLoading] = React.useState(false);

    // strip HTML tags from rich text
    function stripHtmlTags(html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    // Parses a string field into rows (split by '||') and extracts boolean flags from a specific index
    function parsePropertyDataField(fieldValue: string, indexOfFlag: number): { rows: string[][], flags: boolean[] } {
        const rows = fieldValue?.split('||,')?.map((item: string) => item?.split('||'));
        const flags = rows?.map(row => row?.[indexOfFlag] === 'true');
        return { rows, flags };
    }

    // Checks if the first row's columns (2 to 7) are all empty
    const isFirstRowEmpty = (data: string[][]): boolean =>
        data?.length > 0 && data[0].slice(2, 8).every(col => col.trim() === '');

    // Wrapper to parse data and determine if the first row is empty
    const buildPropertyData = (
        fieldValue: string,
        indexOfFlag: number
    ): { data: ReturnType<typeof parsePropertyDataField>, isFirstRowEmpty: boolean } => {
        const data = parsePropertyDataField(fieldValue, indexOfFlag);
        return {
            data,
            isFirstRowEmpty: isFirstRowEmpty(data.rows),
        };
    };

    // Builds a large object of structured property data using specific field mappings
    const propertyData = {
        '2.4.1': buildPropertyData(listitems?.Payments1, 8),
        '2.4.2': buildPropertyData(listitems?.Payments2, 8),
        '2.4.3': buildPropertyData(listitems?.Payments3, 8),
        '2.4.4': buildPropertyData(listitems?.Payments4, 8),
        '2.4.5': buildPropertyData(listitems?.Payments5, 8),
        '2.4.6': buildPropertyData(listitems?.Payments6, 8),
        '2.4.7': buildPropertyData(listitems?.Payments7, 8),
        '2.4.8': buildPropertyData(listitems?.Payments8, 8),
        '2.5': buildPropertyData(listitems?.ResponsibleOps, 7),
        '2.6': buildPropertyData(listitems?.PropertyPlans, 6),
        '2.7': buildPropertyData(listitems?.SystemProperty, 5),
        '3.1': buildPropertyData(listitems?.EngagementAgreements, 11),
        '3.2': buildPropertyData(listitems?.CorrectnessTests, 9),
        '3.3': buildPropertyData(listitems?.PeriodicExaminations, 10),
        '3.4': buildPropertyData(listitems?.OperationalTests, 9),
        '3.5': buildPropertyData(listitems?.InformationOperation, 5),
        '4.1': buildPropertyData(listitems?.Environmental, 10),
        '4.2': buildPropertyData(listitems?.OData__x0034__x002e_2, 10),
        '4.3': buildPropertyData(listitems?.OData__x0034__x002e_3, 10),
        '4.4': buildPropertyData(listitems?.OData__x0034__x002e_4, 10),
        '4.5': buildPropertyData(listitems?.OData__x0034__x002e_5, 10),
        '5.1': buildPropertyData(listitems?.OData__x0035__x002e_1, 10),


        '5.3': buildPropertyData(listitems?.OData__x0035__x002e_2r, 10),
        '5.4': buildPropertyData(listitems?.OData__x0035__x002e_4, 10),
        '5.5': buildPropertyData(listitems?.OData__x0035__x002e_5, 11),
        '5.6': buildPropertyData(listitems?.OData__x0035__x002e_6, 10),
        '5.7': buildPropertyData(listitems?.OData__x0035__x002e_7, 10),
        '5.8': buildPropertyData(listitems?.OData__x0035__x002e_8, 11),
        '5.9': buildPropertyData(listitems?.OData__x0035__x002e_9, 10),
        '6.2': buildPropertyData(listitems?.OData__x0036__x002e_2, 10),



        '5.2.1': buildPropertyData(listitems?.OData__x0035__x002e_2, 11),
        '5.2.2': buildPropertyData(listitems?.OData__x0035__x002e_2_x002e_2, 11),
        '6.1': buildPropertyData(listitems?.OData__x0036__x002e_1, 9),
        '7.1': buildPropertyData(listitems?.OData__x0037__x002e_1, 9),
        '7.2': buildPropertyData(listitems?.OData__x0037__x002e_2, 9),

        'FD': buildPropertyData(listitems?.FindingText, 2),
    };

    const keys = [
        '2.4.1', '2.4.2', '2.4.3', '2.4.4',
        '2.4.5', '2.4.6', '2.4.7', '2.4.8'
    ] as const;

    type PropertyKey = typeof keys[number];

    // Build a typed map of property data specifically for Section 2.4 components
    const propertyDataForSection2_4: Record<PropertyKey, {
        data: { rows: string[][]; flags: boolean[] };
        isFirstRowEmpty: boolean;
    }> = {
        '2.4.1': buildPropertyData(listitems?.Payments1, 8),
        '2.4.2': buildPropertyData(listitems?.Payments2, 8),
        '2.4.3': buildPropertyData(listitems?.Payments3, 8),
        '2.4.4': buildPropertyData(listitems?.Payments4, 8),
        '2.4.5': buildPropertyData(listitems?.Payments5, 8),
        '2.4.6': buildPropertyData(listitems?.Payments6, 8),
        '2.4.7': buildPropertyData(listitems?.Payments7, 8),
        '2.4.8': buildPropertyData(listitems?.Payments8, 8)
    };


    const shouldShowSection = keys.some(key => !propertyDataForSection2_4[key].isFirstRowEmpty);
    const Name01 = listitems?.Names1.split('||,');
    const Name02 = listitems?.Names2.split('||,');
    const NumberofOps = listitems?.NumberofOps;
    const Lookup_Field_Section_1 = listitems?.PropertyDetails?.split('||') || []
    const Lookup_Field_Section_2 = listitems?.QuantitativeData.split('||')
    const Lease_Expiration_Date = listitems?.LeaseExpirationDate || ''
    const ContractNumber = listitems?.ContractNumber || ''

    // Helper: read a single cell value (supports inputs/select/textarea inside a TD)
    const getCellValue = (cell: Element | null | undefined): string => {
        if (!cell) return '';
        const el = cell as HTMLElement;

        // prefer input/select/textarea values when present
        const input = el.querySelector('input, select, textarea') as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) | null;
        if (input) {
            const tag = input.tagName?.toLowerCase();
            if (tag === 'input') {
                const inp = input as HTMLInputElement;
                if (inp.type === 'checkbox' || inp.type === 'radio') return '';
                return inp.value || '';
            }
            if (tag === 'select') {
                const sel = input as HTMLSelectElement;
                return sel.options[sel.selectedIndex]?.text || '';
            }
            if (tag === 'textarea') {
                return (input as HTMLTextAreaElement).value || '';
            }
        }

        return (el.textContent || '').toString().trim();
    };

    // Build tableData for tables that include a header column named 'סעיף'.
    // Returns an array like: [{ '<סעיף value>': { th: [...], td: [...] } }, ...]
    const getTablesData = (tableIds?: string[]): Array<Record<string, { th: string[]; td: string[] }>> => {
        const output: Array<Record<string, { th: string[]; td: string[] }>> = [];

        const processTable = (table: HTMLTableElement) => {
            if (!table) return;

            // get header cells: prefer thead th, fallback to first tr th
            let headerCells = ([] as any).slice.call(table.querySelectorAll('thead th')) as HTMLTableCellElement[];
            if (!headerCells || headerCells.length === 0) {
                const firstRow = table.querySelector('tr');
                if (firstRow) headerCells = headerCells.concat(([] as any).slice.call(firstRow.querySelectorAll('th')));
            }

            const headers = headerCells.map(h => ((h.textContent || '') as string).toString().trim());
            // const uniqueIdx = headers.findIndex(h => h === 'סעיף');
            // if (uniqueIdx === -1) return; // skip tables without סעיף

            // 👇 Allow multiple possible "unique ID" columns
            const possibleKeys = ['סעיף', 'פרק'];
            const uniqueIdx = headers.findIndex(h => possibleKeys.indexOf(h) !== -1);


            // Prepare per-column arrays of td values
            const colValues: string[][] = headers.map(() => []);

            // iterate rows that contain td cells
            const rows = ([] as any).slice.call(table.querySelectorAll('tr')) as HTMLTableRowElement[];
            for (let r = 0; r < rows.length; r++) {
                const row = rows[r];
                // skip header rows
                if ((row.querySelectorAll('th') || []).length > 0) continue;
                const tds = ([] as any).slice.call(row.querySelectorAll('td')) as Element[];
                for (let c = 0; c < headers.length; c++) {
                    const td = tds[c] as Element | undefined | null;
                    colValues[c].push(getCellValue(td || null));
                }
            }

            // For each non-empty unique key in the unique column, build an object
            const uniqueCol = colValues[uniqueIdx] || [];
            for (let i = 0; i < uniqueCol.length; i++) {
                const key = (uniqueCol[i] || '').toString().trim();
                if (!key) continue;
                const tdRow = colValues.map(col => col[i] || '');
                const obj: Record<string, { th: string[]; td: string[] }> = {};
                obj[key] = { th: headers.slice(), td: tdRow };
                output.push(obj);
            }
        };

        if (tableIds && tableIds.length > 0) {
            tableIds.forEach(id => {
                const t = document.getElementById(id) as HTMLTableElement | null;
                if (t) processTable(t);
            });
        } else {
            const tables = ([] as any).slice.call(document.querySelectorAll('table')) as HTMLTableElement[];
            tables.forEach(processTable);
        }

        return output;
    };

    // expose helper for runtime access (also prevents 'declared but never used' warnings)
    try {
        (window as any).getTablesData = getTablesData;
    } catch (e) {
        // ignore in non-browser environments
    }

    console.log('=========> Package V23 Date : 05/12/2025')

    function convertTextDateToDDMMYYYY(dateStr: string): string {
        if (!dateStr) return "";

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";

        const day = date.getDate() < 10
            ? "0" + date.getDate()
            : String(date.getDate());

        const month = (date.getMonth() + 1) < 10
            ? "0" + (date.getMonth() + 1)
            : String(date.getMonth() + 1);

        const year = date.getFullYear();

        return day + "/" + month + "/" + year;
    }

     function parseDDMMYYYY(dateStr: string): Date | null {
        if (!dateStr) return null;

        const parts = dateStr.split("/");
        if (parts.length !== 3) return null;

        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1; // JS months are 0-based
        const year = Number(parts[2]);

        return new Date(year, month, day);
    }

    function diffInMonths(from: Date, to: Date): number {
        let months =
            (to.getFullYear() - from.getFullYear()) * 12 +
            (to.getMonth() - from.getMonth());

        // If the day has not passed yet, reduce 1 month
        if (to.getDate() < from.getDate()) {
            months--;
        }

        return Math.abs(months);
    }

    // Indexing is pending
    const exportAllToExcel = (
        tables: { id: string; title: string }[],
        fileName: string,
        Surveydate: any,
    ) => {
        const aoa: string[][] = [];

        // 🔹 Define header (2 merged rows)
        const mainHeader = ["Chapter", "Subject", "Area", "קיים / לא קיים במבנה", "סטטוס", "", "הקלד תאריך הבדיקה", "", "קיים", "לא קיים", "הקלד שם ספק", "", "בוצע", "לא בוצע", "", "תקין", "נדרש שיפור", "מועד ביצוע הבדיקה", "תדירות", "תאריך העסקה", "שם ספק"];

        const topRow: string[] = new Array(mainHeader.length).fill("");
        topRow[0] = ": תאריך ביצוע הסקר";         // column A
        topRow[1] = formatDateToDDMMYYYY(Surveydate) || '';   // column B
        aoa.push(topRow);

        const subHeader = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
        aoa.push(mainHeader);
        aoa.push(subHeader);

        const allthTDData: Array<Record<string, { th: string[]; td: string[] }>> = [];

        // 🔹 Collect all table data
        tables.forEach((tbl) => {
            const table = document.getElementById(tbl.id) as HTMLTableElement | null;
            if (table) {
                const tableDataForThis =
                    typeof getTablesData === "function" ? getTablesData([table.id]) : [];
                allthTDData.push(...tableDataForThis);
            }
        });

        // 🔹 Group data by the first two numbers (e.g., "2,7", "3,1", etc.)
        const groupedData: Record<string, Array<{ th: string[], td: string[] }>> = {};

        allthTDData.forEach((item) => {
            const keys = Object.keys(item || {});
            if (!keys.length) return;

            const key = keys[0];
            const entry = item[key];
            if (!entry || !Array.isArray(entry.th) || !Array.isArray(entry.td)) return;

            // Extract group from key (e.g., "2,7,76" -> "2,7")
            const keyParts = key.split(',');
            if (keyParts.length >= 2) {
                const groupKey = `${keyParts[0]},${keyParts[1]}`;

                if (!groupedData[groupKey]) {
                    groupedData[groupKey] = [];
                }
                groupedData[groupKey].push(entry);
            }
        });

        const groupColors: Record<string, string> = {
            '2,7': 'ffffcc',
            '3,1': 'b8cce4',
            '3,2': 'fcd5b4',
            '3,3': 'd8e4bc',
            '3,4': 'ccc0da',
            '3,5': 'b7dee8',
            '4,1': 'd8e4bc',
            '4,2': 'e6b8b7',
            '4,3': '8db4e2',
            '4,4': 'fabf8f',
            '5,1': 'da9694',
            '5,2': 'b7dee8',
            '5,3': 'c4d79b',
            '5,4': 'ffffcc',
            '5,5': 'c4bd97',
            '6,1': 'e6b8b7',
            '7,1': 'b8cce4'
        };

        // 🔹 Define manual TD index to Excel column mapping for each group
        const groupColumnMapping: Record<string, Record<number, number>> = {
            // For group "2,7" - manually map TD indices to Excel columns
            '2,7': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                2: 2,
                3: 3,
            },
            // For group "3,1" - manually map TD indices to Excel columns
            '3,1': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                3: 17,
                2: 20,
                // 3: 6,
                // 5: 4,
            },
            // For group "3,2" - manually map TD indices to Excel columns
            '3,2': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                3: 19,
                4: 18,
                // 2: 2,
                // 3: 3,
            },
            // For group "3,3" - manually map TD indices to Excel columns
            '3,3': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                3: 19,
                4: 18,
                // 2: 2,
                // 3: 6,
            },
            '3,4': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                2: 19,
                // 2: 2,
                // 3: 6,
            },
            // For group "3,5" - manually map TD indices to Excel columns
            '3,5': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                2: 3,
                3: 4,
            },
            // For group "7,1" - manually map TD indices to Excel columns
            '7,1': {
                // TD Index -> Excel Column
                0: 0,
                1: 1,
                // 2: 3,
                4: 4,
            },
            // New Groups to Add
            '4,1': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '4,2': {
                0: 0,
                1: 1,
                2: 3,
                4: 4,
            },
            '4,3': {
                0: 0,
                1: 1,
                2: 3,
                4: 4,
            },
            '4,4': {
                0: 0,
                1: 1,
                2: 3,
                4: 4,
            },
            '5,1': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '5,2': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '5,3': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '5,4': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '5,5': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
            '6,1': {
                0: 0,
                1: 1,
                2: 3,
                5: 4,
            },
        };

        // 🔹 Track group row information for styling
        const groupRowInfo: Array<{ groupKey: string, rowIndex: number }> = [];

        // 🔹 Process each group and create rows
        Object.keys(groupedData).forEach(groupKey => {
            const groupEntries = groupedData[groupKey];
            const columnMapping = groupColumnMapping[groupKey];

            if (!columnMapping) {
                console.warn(`No column mapping defined for group: ${groupKey}`);
                return;
            }

            groupEntries.forEach(entry => {
                // Initialize empty row
                const row = new Array(mainHeader.length).fill("");

                // Manually map each TD index to Excel column based on the group mapping
                entry.td.forEach((tdValue, tdIndex) => {
                    const excelColumn = columnMapping[tdIndex];

                    if (excelColumn !== undefined && excelColumn < mainHeader.length) {
                        row[excelColumn] = tdValue;
                    }

                    // // Special logic ONLY for group 3,2
                    // if (excelColumn !== undefined && groupKey === "3,2") {

                    //     if (tdIndex === 3 || tdIndex === 4) {

                    //         const executionDateStr = convertTextDateToDDMMYYYY(entry.td[3]);   // example: "24/09/2025"
                    //         const frequencyStr = entry.td[4];       // example: "2 חודשים"
                    //         const surveyDateStr = formatDateToDDMMYYYY(Surveydate); // "16/07/2025" or empty

                    //         // If any missing → Excel cell empty
                    //         if (!executionDateStr || !frequencyStr || !surveyDateStr) {
                    //             row[3] = "לא בוצע";
                    //             return;
                    //         }

                    //         // Convert dd/mm/yyyy → JS date
                    //         const parseDate = (d: string) => {
                    //             const [day, month, year] = d.split("/").map(n => parseInt(n));
                    //             return new Date(year, month - 1, day);
                    //         };

                    //         const execDate = parseDate(executionDateStr);
                    //         const surveyDate = parseDate(surveyDateStr);

                    //         // Extract frequency number (e.g. "2 חודשים" → 2)
                    //         const frequencyNum = parseInt(frequencyStr?.replace(/\D+/g, "")) || 0;
                    //         // const frequencyDays = frequencyNum * 30;  // חודש = approx 30 days

                    //         // Calculate difference
                    //         // const diffDays = Math.floor((surveyDate.getTime() - execDate.getTime()) / (1000 * 3600 * 24));
                    //         // Calculate absolute difference
                    //         const diffDays = Math.abs(
                    //             Math.floor((surveyDate.getTime() - execDate.getTime()) / (1000 * 3600 * 24))
                    //         );

                    //         // Apply rule
                    //         if (diffDays > frequencyNum) {
                    //             row[3] = "לא בוצע";    // Not Done
                    //         } else {
                    //             row[3] = "בוצע";       // Done
                    //         }
                    //     }
                    // }

                    // Special logic ONLY for group 3,2
                    if (excelColumn !== undefined && groupKey === "3,2") {

                        if (tdIndex === 3 || tdIndex === 4) {

                            const executionDateStr = convertTextDateToDDMMYYYY(entry.td[3]);   // example: "24/09/2025"
                            const frequencyStr = entry.td[4];       // example: "2 חודשים"
                            const surveyDateStr = formatDateToDDMMYYYY(Surveydate); // "16/07/2025" or empty

                            // If any missing → Excel cell empty
                            if (!executionDateStr || !frequencyStr || !surveyDateStr) {
                                row[3] = "לא בוצע";
                                return;
                            }

                            // Extract frequency number (e.g. "2 חודשים" → 2)
                            const frequencyNum = parseInt(frequencyStr?.replace(/\D+/g, "")) || 0;

                            // Calculate difference

                            const execDate = parseDDMMYYYY(executionDateStr);
                            const surveyDate = parseDDMMYYYY(surveyDateStr);

                            if (!execDate || !surveyDate) {
                                row[3] = "לא בוצע";
                                return;
                            }

                            // Calculate month difference
                            const diffDays = diffInMonths(execDate, surveyDate);

                            // Apply rule
                            if (diffDays > frequencyNum) {
                                row[3] = "לא בוצע";    // Not Done
                            } else {
                                row[3] = "בוצע";       // Done
                            }
                        }
                    }

                    // Special logic ONLY for group 3,3
                    if (groupKey === "3,3" && tdIndex === 3) {
                        const isEmpty = !tdValue || tdValue.toString().trim() === "";

                        // Fifth column index = 4 (0-based)
                        row[3] = isEmpty ? "לא בוצע" : "בוצע";
                    }
                    // Special logic ONLY for group 3,4
                    if (groupKey === "3,4" && tdIndex === 2) {
                        const isEmpty = !tdValue || tdValue.toString().trim() === "";

                        // Fifth column index = 4 (0-based)
                        row[3] = isEmpty ? "לא בוצע" : "בוצע";
                    }

                    // Special logic ONLY for group 3,1
                    if (groupKey === "3,1" && tdIndex === 2) {
                        const isEmpty = !tdValue || tdValue.toString().trim() === "";

                        // Fifth column index = 4 (0-based)
                        row[3] = isEmpty ? "" : "בוצע";
                    }
                });

                // Only add row if it has any data
                const hasAnyData = row.some(cell => cell.toString().trim() !== "");
                if (hasAnyData) {
                    const rowIndex = aoa.length;
                    aoa.push(row);
                    // Store group information for styling
                    groupRowInfo.push({ groupKey, rowIndex });
                }
            });
        });

        // 🔹 Create worksheet
        const ws = XLSX.utils.aoa_to_sheet(aoa);

        // 🔹 Merge first two header rows
        // ws["!merges"] = mainHeader.map((_, c) => ({
        //     s: { r: 0, c },
        //     e: { r: 1, c },
        // }));

        ws["!merges"] = mainHeader.map((_, c) => ({
            s: { r: 1, c },
            e: { r: 2, c },
        }));

        // 🔹 Identify columns with non-empty headers for auto-filter
        const filterColumns: number[] = [];
        mainHeader.forEach((header, index) => {
            if (header.trim() !== "") {
                filterColumns.push(index);
            }
        });

        // 🔹 Add auto-filter only to columns with non-empty headers
        if (filterColumns.length > 0) {
            const firstFilterCol = Math.min(...filterColumns);
            const lastFilterCol = Math.max(...filterColumns);

            ws['!autofilter'] = {
                ref: XLSX.utils.encode_range({
                    // s: { r: 1, c: firstFilterCol },
                    // e: { r: 1, c: lastFilterCol }
                    s: { r: 2, c: firstFilterCol },
                    e: { r: 2, c: lastFilterCol }
                })
            };
        }

        // 🔹 Define colors for headers
        const firstHeaderColor = "c7c7c7";
        const secondHeaderColor = "fec000";

        // 🔹 Border style
        const borderStyle = {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
        };

        // 🔹 Apply styles for each cell
        const totalRows = aoa.length;
        const totalCols = mainHeader.length;

        for (let r = 0; r < totalRows; r++) {
            for (let c = 0; c < totalCols; c++) {
                const cellAddress = XLSX.utils.encode_cell({ c, r });
                const cell = ws[cellAddress];
                if (!cell) continue;

                const shouldApplyBorder = c <= 4;

                if (r <= 1) {
                    // Header rows styling (unchanged)
                    let fillColor = null;
                    if (c === 0 || c === 1 || c === 3 || c === 4) {
                        if (c === 0 || c === 1) {
                            fillColor = firstHeaderColor;
                        } else if (c === 3 || c === 4) {
                            fillColor = secondHeaderColor;
                        }
                    }

                    if (shouldApplyBorder) {
                        cell.s = {
                            alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
                            font: { bold: true },
                            border: borderStyle,
                            ...(fillColor && { fill: { fgColor: { rgb: fillColor } } })
                        };
                    } else {
                        cell.s = {
                            alignment: { horizontal: "center", vertical: "center", readingOrder: 2 },
                            font: { bold: true },
                        };
                    }
                } else {
                    // Body rows - apply group-specific colors only to columns 0-4
                    const groupInfo = groupRowInfo.find(info => info.rowIndex === r);
                    const groupColor = groupInfo ? groupColors[groupInfo.groupKey] : "FCFECC"; // Default color

                    // Apply color only to columns 0-4 (first to fifth column)
                    const shouldApplyColor = c <= 4;

                    if (shouldApplyBorder) {
                        cell.s = {
                            alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
                            ...(shouldApplyColor && { fill: { fgColor: { rgb: groupColor } } }),
                            border: borderStyle,
                        };
                    } else {
                        cell.s = {
                            alignment: { horizontal: "right", vertical: "center", readingOrder: 2 },
                            ...(shouldApplyColor && { fill: { fgColor: { rgb: groupColor } } }),
                        };
                    }
                }
            }
        }

        // 🔹 Set column width
        ws["!cols"] = mainHeader.map((header) => {
            if (header.trim() === "") {
                return { wch: 8 };
            } else {
                return { wch: 25 };
            }
        });

        // 🔹 Build workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Export");

        // 🔹 Save Excel
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob: any = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${fileName}.xlsx`);
    };






    
    const getMaxRows = () => {
        const width = window.innerWidth;

        if (width > 1440) return 21;
        if (width <= 1440 && width >= 1300) return 15;
        return 9; // below 1300
    };

    // const PrintData = async () => {
    //     setIsLoading(true);
    //     try {

    //         // ------------------------------
    //         const hiddenElements = document.querySelectorAll('.only-print');
    //         const originalDisplayStyles: string[] = [];

    //         hiddenElements.forEach((el, i) => {
    //             originalDisplayStyles[i] = (el as HTMLElement).style.display;
    //             (el as HTMLElement).style.display = 'block';
    //         });
    //         // ----------------------------

    //         // Split each section's table rows into chunks of 21
    //         const originalSections = [].slice.call(document.querySelectorAll('.page-section01'));



    //         originalSections.forEach((section: { querySelector: (arg0: string) => any; cloneNode: (arg0: boolean) => HTMLElement; }, sectionIndex: number) => {
    //             if (sectionIndex < 4 || sectionIndex > 19) return; // only sections 4–19

    //             const tbody = section.querySelector('tbody.chunkrow');
    //             if (!tbody) return;

    //             // const rows = Array.from(tbody.querySelectorAll('tr'));
    //             const rows = [].slice.call(tbody.querySelectorAll('tr'));
    //             // const MAX_ROWS = 21;
    //             const MAX_ROWS = getMaxRows();

    //             if (rows.length <= MAX_ROWS) return;

    //             // Keep first 21 rows here
    //             tbody.innerHTML = '';
    //             rows.slice(0, MAX_ROWS).forEach((row: any) => tbody.appendChild(row));

    //             // Create new sections for subsequent chunks
    //             // let insertionPoint = section;
    //             let insertionPoint = section as unknown as HTMLElement;
    //             for (let i = MAX_ROWS; i < rows.length; i += MAX_ROWS) {
    //                 const chunk = rows.slice(i, i + MAX_ROWS);


    //                 const clone = section.cloneNode(true) as HTMLElement;

    //                 //Remove thead or chunkrowHeader
    //                 const thead = clone.querySelector('.chunkrowHeader');
    //                 if (thead && thead.parentNode) {
    //                     thead.parentNode.removeChild(thead);
    //                 }

    //                 //Remove title (chunkrowTitle)
    //                 const title = clone.querySelector('.chunkrowTitle');
    //                 if (title && title.parentNode) {
    //                     title.parentNode.removeChild(title);
    //                 }


    //                 const cloneTbody = clone.querySelector('tbody.chunkrow')!;
    //                 cloneTbody.innerHTML = '';
    //                 chunk.forEach((row: any) => cloneTbody.appendChild(row));

    //                 insertionPoint.parentNode!.insertBefore(clone, insertionPoint.nextSibling);
    //                 insertionPoint = clone;
    //             }
    //         });



    //         const sections = document.querySelectorAll('.page-section01');

    //         if (!sections.length) throw new Error('No sections to print');

    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'pt',
    //             format: 'a4',
    //         });

    //         const pageWidth = 595;
    //         const pageHeight = 842;
    //         const margin = 10;
    //         const contentWidth = pageWidth - 2 * margin;
    //         const contentHeight = pageHeight - 2 * margin;

    //         // let pageNumber = 1;

    //         for (let i = 0; i < sections.length; i++) {
    //             const section = sections[i] as HTMLElement;

    //             // Make sure section is relatively positioned
    //             const originalPosition = section.style.position;
    //             if (getComputedStyle(section).position === 'static') {
    //                 section.style.position = 'relative';
    //             }

    //             // Apply RTL styles temporarily
    //             const inputs = section.querySelectorAll('input');
    //             const textareas = section.querySelectorAll('textarea');
    //             const headers = section.querySelectorAll('.pdf_lbl');
    //             const originalStyles: string[] = [];
    //             const originalTextareaStyles: string[] = [];
    //             const mirrors: HTMLElement[] = [];
    //             const originalHeaderStyles: string[] = [];

    //             inputs.forEach(input => {
    //                 originalStyles.push(input.style.cssText);
    //                 input.style.textAlign = 'right';
    //                 input.style.direction = 'rtl';
    //             });

    //             textareas.forEach(textarea => {
    //                 originalTextareaStyles.push(textarea.style.cssText);

    //                 const mirror = document.createElement('div');
    //                 mirror.innerText = textarea.value;
    //                 const rect = textarea.getBoundingClientRect();
    //                 const sectionRect = section.getBoundingClientRect();

    //                 mirror.style.position = 'absolute';
    //                 mirror.style.left = (rect.left - sectionRect.left) + 'px';
    //                 mirror.style.top = (rect.top - sectionRect.top) + 'px';
    //                 mirror.style.width = textarea.offsetWidth + 'px';
    //                 // mirror.style.height = textarea.offsetHeight + 'px';
    //                 mirror.style.height = textarea.scrollHeight + 'px';
    //                 mirror.style.font = getComputedStyle(textarea).font;
    //                 mirror.style.padding = getComputedStyle(textarea).padding;
    //                 mirror.style.border = getComputedStyle(textarea).border;
    //                 mirror.style.backgroundColor = getComputedStyle(textarea).backgroundColor;
    //                 mirror.style.color = getComputedStyle(textarea).color;
    //                 mirror.style.whiteSpace = 'pre-wrap';
    //                 mirror.style.wordWrap = 'break-word';
    //                 mirror.style.direction = 'rtl';
    //                 mirror.style.textAlign = 'right';
    //                 mirror.style.overflow = 'hidden';
    //                 mirror.style.zIndex = '10';
    //                 mirror.style.wordBreak = 'break-word'

    //                 textarea.style.visibility = 'hidden';
    //                 section.appendChild(mirror);
    //                 mirrors.push(mirror);


    //             });

    //             headers.forEach(header => {
    //                 const el = header as HTMLElement;
    //                 originalHeaderStyles.push(el.style.cssText);
    //                 // el.style.direction = 'rtl';
    //                 el.style.textAlign = 'right';
    //                 el.style.unicodeBidi = 'bidi-override';
    //             });

    //             const canvas = await html2canvas(section, {
    //                 scale: 2,
    //                 useCORS: true,
    //                 backgroundColor: '#ffffff',
    //                 width: section.scrollWidth,
    //                 height: section.scrollHeight,
    //                 scrollX: 0,
    //                 scrollY: 0,
    //             });

    //             // Restore styles
    //             inputs.forEach((input, index) => {
    //                 input.style.cssText = originalStyles[index];
    //             });
    //             textareas.forEach((textarea, index) => {
    //                 textarea.style.cssText = originalTextareaStyles[index];
    //                 textarea.style.visibility = 'visible';
    //             });
    //             headers.forEach((header, index) => {
    //                 const el = header as HTMLElement;
    //                 el.style.cssText = originalHeaderStyles[index];
    //             });
    //             mirrors.forEach(mirror => mirror.remove());
    //             section.style.position = originalPosition;

    //             const canvasWidth = canvas.width;
    //             const canvasHeight = canvas.height;
    //             const scale = contentWidth / canvasWidth;
    //             const sliceHeight = contentHeight / scale;

    //             let sliceY = 0;
    //             while (sliceY < canvasHeight) {
    //                 const sliceCanvas = document.createElement('canvas');
    //                 sliceCanvas.width = canvasWidth;
    //                 sliceCanvas.height = Math.min(sliceHeight, canvasHeight - sliceY);

    //                 const sliceCtx = sliceCanvas.getContext('2d');
    //                 if (sliceCtx) {
    //                     sliceCtx.drawImage(
    //                         canvas,
    //                         0,
    //                         sliceY,
    //                         canvasWidth,
    //                         sliceCanvas.height,
    //                         0,
    //                         0,
    //                         canvasWidth,
    //                         sliceCanvas.height
    //                     );

    //                     if (i > 0 || sliceY > 0) pdf.addPage();

    //                     const xPosition = pageWidth - margin - contentWidth;
    //                     pdf.addImage(
    //                         sliceCanvas.toDataURL('image/png'),
    //                         'PNG',
    //                         xPosition,
    //                         margin,
    //                         contentWidth,
    //                         sliceCanvas.height * scale,
    //                         undefined,
    //                         'FAST'
    //                     );

    //                     // pdf.setFontSize(6);
    //                     // pdf.text(`${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    //                     // pageNumber++;
    //                 }

    //                 sliceY += sliceHeight;
    //             }

    //         }



    //         const totalPages = pdf.getNumberOfPages();
    //         for (let i = 1; i <= totalPages; i++) {
    //             pdf.setPage(i);

    //             // Optional: draw white background rectangle if image background is too dark
    //             // pdf.setDrawColor(255, 255, 255);
    //             // pdf.rect(pageWidth / 2 - 40, pageHeight - 25, 80, 15, 'F');

    //             pdf.setFontSize(6);
    //             pdf.setTextColor(0);
    //             pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    //         }

    //         // ---------------------------------------------
    //         hiddenElements.forEach((el, i) => {
    //             (el as HTMLElement).style.display = originalDisplayStyles[i];
    //         });
    //         // --------------------------------------------
    //         const now = new Date();
    //         const pad = (num: number) => (num < 10 ? '0' + num : num.toString());

    //         const day = pad(now.getDate());
    //         const month = pad(now.getMonth() + 1); // Months are 0-based
    //         const year = now.getFullYear();
    //         const hours = pad(now.getHours());
    //         const minutes = pad(now.getMinutes());
    //         const seconds = pad(now.getSeconds());
    //         const timestamp = `${day}${month}${year}${hours}${minutes}${seconds}`;

    //         // pdf.save('Data.pdf');
    //         // pdf.save(`PropertySurveyExport_${listitems.Form_ID}.pdf`);
    //         pdf.save(`PropertySurveyExport_Form_${listitems.Form_ID}_${timestamp}.pdf`);
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('שגיאה ביצירת ה-PDF. אנא נסה שוב.');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };



    // ✅ Remove ReportType=PDF or ReportType=excel from URL (no reload)
    // const cleanReportTypeFromUrl = () => {
    //     const url = new URL(window.location.href);

    //     if (url.searchParams.has('ReportType')) {
    //         const reportType = url.searchParams.get('ReportType');

    //         if (reportType === 'PDF' || reportType === 'excel') {
    //             url.searchParams.delete('ReportType');

    //             // Update URL without reloading the page
    //             window.history.replaceState({}, document.title, url.toString());
    //         }
    //     }
    // };



    const reloadWithoutReportType = () => {
        const currentUrl = new URL(window.location.href);

        if (currentUrl.searchParams.has('ReportType')) {
            const reportType = currentUrl.searchParams.get('ReportType');

            if (reportType === 'PDF' || reportType === 'pdf' || reportType === 'excel') {
                currentUrl.searchParams.delete('ReportType');

                // ✅ Navigate to cleaned URL
                window.location.href = currentUrl.toString();
                return;
            }
        }

        // ✅ If ReportType does not exist → reload same page
        window.location.href = window.location.href;
    };



    const PrintData = async () => {
        setIsLoading(true);
        try {

            // ------------------------------
            const hiddenElements = document.querySelectorAll('.only-print');
            const originalDisplayStyles: string[] = [];

            hiddenElements.forEach((el, i) => {
                originalDisplayStyles[i] = (el as HTMLElement).style.display;
                (el as HTMLElement).style.display = 'block';
            });
            // ----------------------------

            // Split each section's table rows into chunks of 21
            const originalSections = [].slice.call(document.querySelectorAll('.page-section01'));



            originalSections.forEach((section: { querySelector: (arg0: string) => any; cloneNode: (arg0: boolean) => HTMLElement; }, sectionIndex: number) => {
                if (sectionIndex < 4 || sectionIndex > 19) return; // only sections 4–19

                const tbody = section.querySelector('tbody.chunkrow');
                if (!tbody) return;

                // const rows = Array.from(tbody.querySelectorAll('tr'));
                const rows = [].slice.call(tbody.querySelectorAll('tr'));
                // const MAX_ROWS = 21;
                const MAX_ROWS = getMaxRows();

                if (rows.length <= MAX_ROWS) return;

                // Keep first 21 rows here
                tbody.innerHTML = '';
                rows.slice(0, MAX_ROWS).forEach((row: any) => tbody.appendChild(row));

                // Create new sections for subsequent chunks
                // let insertionPoint = section;
                let insertionPoint = section as unknown as HTMLElement;
                for (let i = MAX_ROWS; i < rows.length; i += MAX_ROWS) {
                    const chunk = rows.slice(i, i + MAX_ROWS);


                    const clone = section.cloneNode(true) as HTMLElement;

                    //Remove thead or chunkrowHeader
                    const thead = clone.querySelector('.chunkrowHeader');
                    if (thead && thead.parentNode) {
                        thead.parentNode.removeChild(thead);
                    }

                    //Remove title (chunkrowTitle)
                    const title = clone.querySelector('.chunkrowTitle');
                    if (title && title.parentNode) {
                        title.parentNode.removeChild(title);
                    }


                    const cloneTbody = clone.querySelector('tbody.chunkrow')!;
                    cloneTbody.innerHTML = '';
                    chunk.forEach((row: any) => cloneTbody.appendChild(row));

                    insertionPoint.parentNode!.insertBefore(clone, insertionPoint.nextSibling);
                    insertionPoint = clone;
                }
            });



            const sections = document.querySelectorAll('.page-section01');

            if (!sections.length) throw new Error('No sections to print');

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });

            const pageWidth = 595;
            const pageHeight = 842;
            const margin = 10;
            const contentWidth = pageWidth - 2 * margin;
            const contentHeight = pageHeight - 2 * margin;

            // let pageNumber = 1;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i] as HTMLElement;

                // Make sure section is relatively positioned
                const originalPosition = section.style.position;
                if (getComputedStyle(section).position === 'static') {
                    section.style.position = 'relative';
                }

                // Apply RTL styles temporarily
                const inputs = section.querySelectorAll('input');
                const textareas = section.querySelectorAll('textarea');
                const headers = section.querySelectorAll('.pdf_lbl');
                const originalStyles: string[] = [];
                const originalTextareaStyles: string[] = [];
                const mirrors: HTMLElement[] = [];
                const originalHeaderStyles: string[] = [];

                // ---- REMOVE ALL BOX SHADOWS FOR PDF ----
                const shadowElements = section.querySelectorAll<HTMLElement>('*');
                const originalShadows: string[] = [];

                // inputs.forEach(input => {
                //     const inp = input as HTMLInputElement;
                //     const cs = getComputedStyle(inp);
                //     originalStyles.push(input.style.cssText);
                //     input.style.textAlign = 'right';
                //     input.style.direction = 'rtl';
                //     input.style.lineHeight = cs.lineHeight;

                // });
                const inputMirrors: HTMLElement[] = []; // add this near your other arrays

                inputs.forEach((input, index) => {
                    const inp = input as HTMLInputElement;
                    originalStyles[index] = inp.style.cssText;

                    const cs = getComputedStyle(inp);
                    const rect = inp.getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();

                    input.style.lineHeight = cs.lineHeight;

                    const mirror = document.createElement('div');
                    mirror.textContent = inp.value;

                    // Position mirror exactly where the input is
                    mirror.style.position = 'absolute';
                    mirror.style.left = (rect.left - sectionRect.left) + 'px';
                    mirror.style.top = (rect.top - sectionRect.top) + 'px';
                    mirror.style.width = inp.offsetWidth + 'px';
                    mirror.style.height = inp.offsetHeight + 'px';

                    // Typography
                    mirror.style.fontFamily = cs.fontFamily;
                    mirror.style.fontSize = cs.fontSize;
                    mirror.style.fontWeight = cs.fontWeight;
                    mirror.style.fontStyle = cs.fontStyle;

                    // Critical – make line-height as tall as the control so it will not cut
                    mirror.style.lineHeight = cs.lineHeight//rect.height + 'px'; // or cs.lineHeight if it’s not "normal"

                    // Box model
                    mirror.style.padding = cs.padding;
                    mirror.style.border = cs.border;
                    mirror.style.boxSizing = cs.boxSizing;
                    mirror.style.backgroundColor = cs.backgroundColor;
                    mirror.style.color = cs.color;

                    // RTL & alignment
                    mirror.style.direction = 'rtl';
                    mirror.style.textAlign = 'right';

                    section.appendChild(mirror);
                    inputMirrors.push(mirror);
                });

                textareas.forEach(textarea => {
                    originalTextareaStyles.push(textarea.style.cssText);

                    const mirror = document.createElement('div');
                    mirror.innerText = textarea.value;
                    const rect = textarea.getBoundingClientRect();
                    const sectionRect = section.getBoundingClientRect();

                    mirror.style.position = 'absolute';
                    mirror.style.left = (rect.left - sectionRect.left) + 'px';
                    mirror.style.top = (rect.top - sectionRect.top) + 'px';
                    mirror.style.width = textarea.offsetWidth + 'px';
                    // mirror.style.height = textarea.offsetHeight + 'px';
                    mirror.style.height = textarea.scrollHeight + 'px';
                    mirror.style.font = getComputedStyle(textarea).font;
                    mirror.style.padding = getComputedStyle(textarea).padding;
                    mirror.style.border = getComputedStyle(textarea).border;
                    mirror.style.backgroundColor = getComputedStyle(textarea).backgroundColor;
                    mirror.style.color = getComputedStyle(textarea).color;
                    mirror.style.lineHeight = getComputedStyle(textarea).lineHeight;
                    mirror.style.whiteSpace = 'pre-wrap';
                    mirror.style.wordWrap = 'break-word';
                    mirror.style.direction = 'rtl';
                    mirror.style.textAlign = 'right';
                    mirror.style.overflow = 'hidden';
                    mirror.style.zIndex = '10';
                    mirror.style.wordBreak = 'break-word'

                    textarea.style.visibility = 'hidden';
                    section.appendChild(mirror);
                    mirrors.push(mirror);


                });

                headers.forEach(header => {
                    const el = header as HTMLElement;
                    originalHeaderStyles.push(el.style.cssText);
                    // el.style.direction = 'rtl';
                    el.style.textAlign = 'right';
                    el.style.unicodeBidi = 'bidi-override';
                });

                shadowElements.forEach((el, i) => {
                    originalShadows[i] = el.style.boxShadow;
                    el.style.boxShadow = 'none';
                });

                const canvas = await html2canvas(section, {
                    // scale: 2,
                    scale: window.devicePixelRatio > 1 ? 1.5 : 1,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    width: section.scrollWidth,
                    height: section.scrollHeight,
                    scrollX: 0,
                    scrollY: 0,
                });

                // Restore styles
                inputs.forEach((input, index) => {
                    input.style.cssText = originalStyles[index];
                });
                textareas.forEach((textarea, index) => {
                    textarea.style.cssText = originalTextareaStyles[index];
                    textarea.style.visibility = 'visible';
                });
                headers.forEach((header, index) => {
                    const el = header as HTMLElement;
                    el.style.cssText = originalHeaderStyles[index];
                });
                mirrors.forEach(mirror => mirror.remove());
                section.style.position = originalPosition;

                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const scale = contentWidth / canvasWidth;
                const sliceHeight = contentHeight / scale;

                let sliceY = 0;
                while (sliceY < canvasHeight) {
                    const sliceCanvas = document.createElement('canvas');
                    sliceCanvas.width = canvasWidth;
                    sliceCanvas.height = Math.min(sliceHeight, canvasHeight - sliceY);

                    const sliceCtx = sliceCanvas.getContext('2d');
                    if (sliceCtx) {
                        sliceCtx.drawImage(
                            canvas,
                            0,
                            sliceY,
                            canvasWidth,
                            sliceCanvas.height,
                            0,
                            0,
                            canvasWidth,
                            sliceCanvas.height
                        );

                        if (i > 0 || sliceY > 0) pdf.addPage();

                        const xPosition = pageWidth - margin - contentWidth;
                        pdf.addImage(
                            sliceCanvas.toDataURL('image/png'),
                            'JPEG',
                            xPosition,
                            margin,
                            contentWidth,
                            sliceCanvas.height * scale,
                            undefined,
                            'FAST'
                        );

                        // pdf.setFontSize(6);
                        // pdf.text(`${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
                        // pageNumber++;
                    }

                    sliceY += sliceHeight;
                }

            }



            const totalPages = pdf.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                // Optional: draw white background rectangle if image background is too dark
                // pdf.setDrawColor(255, 255, 255);
                // pdf.rect(pageWidth / 2 - 40, pageHeight - 25, 80, 15, 'F');

                pdf.setFontSize(6);
                pdf.setTextColor(0);
                pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            }

            // ---------------------------------------------
            hiddenElements.forEach((el, i) => {
                (el as HTMLElement).style.display = originalDisplayStyles[i];
            });
            // --------------------------------------------
            const now = new Date();
            const pad = (num: number) => (num < 10 ? '0' + num : num.toString());

            const day = pad(now.getDate());
            const month = pad(now.getMonth() + 1); // Months are 0-based
            const year = now.getFullYear();
            const hours = pad(now.getHours());
            const minutes = pad(now.getMinutes());
            const seconds = pad(now.getSeconds());
            const timestamp = `${day}${month}${year}${hours}${minutes}${seconds}`;

            // pdf.save('Data.pdf');
            // pdf.save(`PropertySurveyExport_${listitems.Form_ID}.pdf`);
            pdf.save(`PropertySurveyExport_Form_${listitems.Form_ID}_${timestamp}.pdf`);
            // ✅ clean URL AFTER successful generation
            reloadWithoutReportType();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('שגיאה ביצירת ה-PDF. אנא נסה שוב.');
        } finally {
            setIsLoading(false);
        }
    };







    const sectionColumnMap = {
        '2.5': [1, 2, 3, 4, 5],
        '2.6': [1, 2, 4],
        '2.7': [1, 4],
        '3.1': [3, 8, 10],
        '3.2': [2, 4, 5, 8],
        '3.3': [2, 3, 5, 9],
        '3.4': [4, 8],
        '3.5': [2, 3, 4],
        '4.1': [3, 4, 8, 9],
        '4.2': [2, 5, 6],
        '4.3': [2, 5, 6],
        '4.4': [2, 5, 6],
        '4.5': [2, 5, 6],
        '5.1': [2, 3, 5, 6],
        '5.2': [2, 5, 6],
        '5.3': [2, 3, 5, 6],
        '5.4': [2, 3, 5, 6],
        '5.5': [2, 3, 4, 6],
        '5.2.1': [2, 3, 4, 6],
        '6.1': [1, 2, 4, 5, 10],
        '7.1': [1, 4, 5, 10],
    };

    const isSectionAllRowsEmpty = (section: any, columnIndexes: number[]) => {
        const rows = section?.data?.rows || [];

        // If there are no rows, treat as empty
        if (rows.length === 0) return true;

        // Check if all rows are empty
        const isAllRowEmpty = rows.every((row: any) =>
            columnIndexes.every(colIndex => {
                const cellValue = row[colIndex];
                return cellValue === null || cellValue === undefined || cellValue.toString().trim() === '';
            })
        );

        return isAllRowEmpty
    };



    return (
        <>
            <div>

                <div className='page-section01'>
                    {/* Section one */}
                    <div className="header-main">
                        <img src={AvivAppLogologo} alt="AVIV Logo" className="logo" />
                        <div className="center-info">
                            מינהלת נכסים<br />
                            <a href="#">משרד הבריאות</a><br />
                            <span>נכסים</span>
                        </div>
                        <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                    </div>

                    <div className="form-toolbar">
                        {/* <div className="form-title">ערוך טופס {listitems?.Form_ID} יחידה מאכלסת:{stripHtmlTags(Lookup_Field_Section_1[9]) || ''} כתובת: {Lookup_Field_Section_1[10] || ''}</div> */}
                        <div className="form-title"> טופס
                            {listitems?.Form_ID}

                            <div style={{ display: 'inline' }}>
                                <label style={{ background: 'none', paddingRight: '15px', width: '100%' }}>
                                    <span className={styles.underlineText}>
                                        <span style={{ paddingRight: "0px" }}>יחידה מאכלסת : {stripHtmlTags(Lookup_Field_Section_1[9]) || ''}</span>
                                        <span style={{ paddingRight: "10px" }}>כתובת : {Lookup_Field_Section_1[10] || ''}</span>
                                    </span>
                                </label>
                            </div>

                        </div>
                        <div className="form-actions">
                            {/* <button className="save-button" onClick={PrintData}><i className="ms-Icon ms-Icon--PDF" /></button> */}
                            <button onClick={PrintData} className='exportbutton' id='ExportPDF'><img src={pdfIcon} />Export PDF</button>
                            {/* <button onClick={() => exportMultipleTablesToExcel(["table25", "table26", "table27", "table31", "table32"], "test")} style={{ border: 'none' }}><i className="ms-Icon ms-Icon--Excel" style={{ fontSize: '26px' }} />Export Excel</button> */}
                            <button id='ExportExcel' className='exportbutton'
                                onClick={() =>
                                    exportAllToExcel(
                                        [
                                            // { id: "table241", title: "2.4.1 -  עירייה  ארנונה" },
                                            // { id: "table242", title: "2.4.2 - תאגיד המים" },
                                            // { id: "table243", title: "2.4.3 - חברת חשמל" },
                                            // { id: "table244", title: "2.4.4 - ניקיון" },
                                            // { id: "table245", title: "2.4.5 - אבטחה" },
                                            // { id: "table246", title: "2.4.6 - ועד הביניין" },
                                            // { id: "table247", title: "2.4.7 - חניות" },
                                            // { id: "table248", title: "2.4.8 - ...להוסיף אחר" },
                                            // { id: "table25", title: "2.5 -בעלי תפקידים בניהול ותחזוקת הנכס" },
                                            // { id: "table26", title: "2.6 - תכניות של הנכס" },
                                            { id: "table27", title: "2.7 - המערכות בנכס" },
                                            { id: "table31", title: "3.1 - הסכמי התקשרות עם נותני שירות" },
                                            { id: "table32", title: "3.2 - בדיקות כשירות ותקינות מערכות בטיחות" },
                                            { id: "table33", title: "3.3 - .בדיקות טיפולים תקופתיים למערכות" },
                                            { id: "table34", title: "3.4 - .בדיקות תפעוליות של המערכות" },
                                            { id: "table35", title: "3.5 - מידע בתפעול ואחזקה יזומה /תפעולית / שבר" },
                                            { id: "table41", title: "4.1 - איכות הסביבה – הפרדה במקור " },
                                            { id: "table42", title: "4.2 - בטיחות" },
                                            { id: "table43", title: '4.3 - נגישות (מתו"ס ושירות)' },
                                            { id: "table44", title: "4.4 - ביטחון" },
                                            { id: "table45", title: "4.5 - ביטחון" },
                                            { id: "table51", title: "5.1 - קירות פנים ותקרה" },
                                            { id: "table521", title: "5.2.1 - גגות חיצוניים" },
                                            { id: "table53", title: "5.3 - ריצוף /דק /שטיחים/קרמיקה" },
                                            { id: "table54", title: "5.4 - דלתות ומשקופים" },
                                            { id: "table55", title: "5.5 - חלונות/ זכוכיות/ רשתות/ סורגים" },
                                            { id: "table61", title: "6.1 - במבנה" },
                                            { id: "table71", title: "7.1 - חשמל" },
                                        ],
                                        `PropertySurveyExport_Form_${listitems.Form_ID}`,
                                        listitems?.Date?.split('T')[0]
                                    )
                                }
                            >
                                <img src={excelIcon} />Export Excel
                            </button>

                        </div>
                    </div>

                    <div className="form-fields" >
                        <div className="select-wrapper">
                            <select >
                                <option selected>פרק</option>
                            </select>
                        </div>
                        <div className="select-wrapper">
                            <select >
                                <option>תחום מקצועי</option>
                            </select>
                        </div>
                        <div className="select-wrapper">
                            <select >
                                <option>נושא</option>
                            </select>
                        </div>
                    </div>

                    <div className="container-section" style={{ fontWeight: '300' }}>
                        <div className="header-section">
                            .פרק א - נתוני הנכס ותיאור
                        </div>
                        <div className="sub-header-section">
                            כללי סוקר
                        </div>


                        <div className="form-row-section" style={{ marginTop: "17px", marginLeft: "15px", marginRight: "15px", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="section1_Gal1_CustomeField">
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '5px' }}>
                                    <label>תאריך ביצוע הסקר</label>
                                    <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0, fontSize: '17px' }} value={formatDateToDDMMYYYY(listitems?.Date?.split('T')[0])} />
                                </div>
                                <input className='section1_Gal1_CustomeField_input' type="text" value={formatDateToDDMMYYYY(listitems.Date?.split('T')[0])} />
                            </div>

                            <div className='section1_Gal1_table_container'>
                                <table id='table11'>
                                    <tr><th colSpan={3}>נציגי "אביב" ניהול הנדסה ומערכות מידע בע"מ - מינהלת נכסים משרד הבריאות</th></tr>
                                    <tbody>
                                        {Name01?.map((row, index) => (
                                            <tr key={index} className="table_241">
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[1]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[2]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[3]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[4]} /></td>
                                                <td className="section1_Gal1_table1_td_Checkbox" style={{ width: 0 }}><input type="checkbox" checked={false} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="add-row-section" style={{ marginBottom: "41px", color: "#333b5e" }}></div>

                        <div className="form-row-section" style={{ marginTop: "17px", marginLeft: "15px", marginRight: "15px", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className="section1_Gal2_CustomeField">
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '5px' }}>
                                    <label>מספר טופס</label>
                                    <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} value={listitems?.Date?.split('T')[0]} readOnly />
                                </div>
                                <input className='section1_Gal2_CustomeField_input' type="text" value={listitems?.Form_ID} readOnly />
                            </div>

                            <div className='section1_Gal1_table_container'>
                                <table id='table12'>
                                    <tr><th colSpan={2}>נציגי התחנה משרד הבריאות</th></tr>
                                    <tbody>
                                        {Name02?.map((row, index) => (
                                            <tr key={index} className="table_241">
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[1]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[2]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[3]} /></td>
                                                <td className="section1_Gal1_table1_td"><input type="text" readOnly value={row.split('||')[4]} /></td>
                                                <td className="section1_Gal1_table1_td_Checkbox" style={{ width: 0 }}><input type="checkbox" checked={false} readOnly /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="add-row-section" style={{ color: "#333b5e" }}></div>
                    </div>

                    {/* <div className="page-section01">
                        <Section02 listitems={listitems} Lookup_Field_Section_1={Lookup_Field_Section_1} Lookup_Field_Section_2={Lookup_Field_Section_2} Lease_Expiration_Date={Lease_Expiration_Date} ContractNumber={ContractNumber} />
                    </div> */}
                </div>

                <div className="page-section01">
                    <Section02 listitems={listitems} Lookup_Field_Section_1={Lookup_Field_Section_1} Lookup_Field_Section_2={Lookup_Field_Section_2} Lease_Expiration_Date={Lease_Expiration_Date} ContractNumber={ContractNumber} />
                </div>




                {shouldShowSection &&
                    <div >
                        <Section_24
                            Table_241={propertyData['2.4.1']}
                            Table_242={propertyData['2.4.2']}
                            Table_243={propertyData['2.4.3']}
                            Table_244={propertyData['2.4.4']}
                            Table_245={propertyData['2.4.5']}
                            Table_246={propertyData['2.4.6']}
                            Table_247={propertyData['2.4.7']}
                            Table_248={propertyData['2.4.8']}
                        />
                    </div>
                }

                {/* {!propertyData['2.5'].isFirstRowEmpty && 
                    <Section_25 section_25_data={propertyData['2.5']} NumberofOps={NumberofOps} />
                } */}

                {propertyData['2.5'] &&
                    !propertyData['2.5'].isFirstRowEmpty &&
                    !isSectionAllRowsEmpty(propertyData['2.5'], sectionColumnMap['2.5']) && (
                        <Section_25
                            section_25_data={propertyData['2.5']}
                            NumberofOps={NumberofOps}
                        />
                    )}




                {/* {!propertyData['2.6'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_26 section_26_data={propertyData['2.6']} />
                    </div>
                } */}
                {propertyData['2.6'] &&
                    !propertyData['2.6'].isFirstRowEmpty &&
                    !isSectionAllRowsEmpty(propertyData['2.6'], sectionColumnMap['2.6']) && (
                        <div className="page-section01">
                            <Section_26 section_26_data={propertyData['2.6']} />
                        </div>
                    )}



                {/* {!propertyData['2.7'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_27 section_27_data={propertyData['2.7']} chapter_data_27={chapterDataMap["2,7"]} />
                    </div>
                } */}
                {propertyData['2.7'] &&
                    !isSectionAllRowsEmpty(propertyData['2.7'], sectionColumnMap['2.7']) && (
                        <div className="page-section01">
                            <Section_27
                                section_27_data={propertyData['2.7']}
                                chapter_data_27={chapterDataMap["2,7"]}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['3.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_31 section_31_data={propertyData['3.1']} chapter_data_31={chapterDataMap["3,1"]} />
                    </div>
                } */}
                {propertyData['3.1'] &&
                    !propertyData['3.1'].isFirstRowEmpty &&
                    !isSectionAllRowsEmpty(propertyData['3.1'], sectionColumnMap['3.1']) && (
                        <div className="page-section01">
                            <Section_31
                                section_31_data={propertyData['3.1']}
                                chapter_data_31={chapterDataMap["3,1"]}
                            />
                        </div>
                    )}


                {/* {!propertyData['3.2'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_32 section_32_data={propertyData['3.2']} chapter_data_32={chapterDataMap["3,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['3.2'] &&
                    !propertyData['3.2'].isFirstRowEmpty &&
                    !isSectionAllRowsEmpty(propertyData['3.2'], sectionColumnMap['3.2']) && (
                        <div className="page-section01">
                            <Section_32
                                section_32_data={propertyData['3.2']}
                                chapter_data_32={chapterDataMap["3,2"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )}


                {/* {!propertyData['3.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_33 section_33_data={propertyData['3.3']} chapter_data_33={chapterDataMap["3,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['3.3'] &&
                    !propertyData['3.3'].isFirstRowEmpty &&
                    !isSectionAllRowsEmpty(propertyData['3.3'], sectionColumnMap['3.3']) && (
                        <div className="page-section01">
                            <Section_33
                                section_33_data={propertyData['3.3']}
                                chapter_data_33={chapterDataMap["3,3"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )}


                {/* {!propertyData['3.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_34 section_34_data={propertyData['3.4']} chapter_data_34={chapterDataMap["3,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['3.4'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['3.4'], sectionColumnMap['3.4']) && (
                        <div className="page-section01">
                            <Section_34
                                section_34_data={propertyData['3.4']}
                                chapter_data_34={chapterDataMap["3,4"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['3.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_35 section_35_data={propertyData['3.5']} chapter_data_35={chapterDataMap["3,5"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['3.5'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['3.5'], sectionColumnMap['3.5']) && (
                        <div className="page-section01">
                            <Section_35
                                section_35_data={propertyData['3.5']}
                                chapter_data_35={chapterDataMap["3,5"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['4.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_41 section_41_data={propertyData['4.1']} chapter_data_41={chapterDataMap["4,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['4.1'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['4.1'], sectionColumnMap['4.1']) && (
                        <div className="page-section01">
                            <Section_41
                                section_41_data={propertyData['4.1']}
                                chapter_data_41={chapterDataMap["4,1"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['4.2'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_42 section_42_data={propertyData['4.2']} chapter_data_42={chapterDataMap["4,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['4.2'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['4.2'], sectionColumnMap['4.2']) && (
                        <div className="page-section01">
                            <Section_42
                                section_42_data={propertyData['4.2']}
                                chapter_data_42={chapterDataMap["4,2"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['4.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_43 section_43_data={propertyData['4.3']} chapter_data_43={chapterDataMap["4,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['4.3'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['4.3'], sectionColumnMap['4.3']) && (
                        <div className="page-section01">
                            <Section_43
                                section_43_data={propertyData['4.3']}
                                chapter_data_43={chapterDataMap["4,3"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['4.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_44 section_44_data={propertyData['4.4']} chapter_data_44={chapterDataMap["4,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['4.4'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['4.4'], sectionColumnMap['4.4']) && (
                        <div className="page-section01">
                            <Section_44
                                section_44_data={propertyData['4.4']}
                                chapter_data_44={chapterDataMap["4,4"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* here implement Section 4.5 */}
                {/* {!propertyData['4.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_45 section_44_data={propertyData['4.5']} chapter_data_44={chapterDataMap["4,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['4.5'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['4.5'], sectionColumnMap['4.5']) && (
                        <div className="page-section01">
                            <Section_45 section_44_data={propertyData['4.5']} chapter_data_44={chapterDataMap["4,4"]} property_Frequency_Data={property_Frequency_Data} />
                        </div>
                    )
                }


                {/* {!propertyData['5.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_51 section_51_data={propertyData['5.1']} chapter_data_51={chapterDataMap["5,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['5.1'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['5.1'], sectionColumnMap['5.1']) && (
                        <div className="page-section01">
                            <Section_51
                                section_51_data={propertyData['5.1']}
                                chapter_data_51={chapterDataMap["5,1"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* {!propertyData['5.2.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_521 section_521_data={propertyData['5.2.1']} chapter_data_521={chapterDataMap["5,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['5.2.1'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['5.2.1'], sectionColumnMap['5.2.1']) && (
                        <div className="page-section01">
                            <Section_521
                                section_521_data={propertyData['5.2.1']}
                                chapter_data_521={chapterDataMap["5,2"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* ========================================================================================================= */}

                {/* !propertyData['5.2.2'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_522 section_521_data={propertyData['5.2.2']} chapter_data_521={chapterDataMap["5,2,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.3'].isFirstRowEmpty */}
                {/* {!propertyData['5.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_53 section_53_data={propertyData['5.3']} chapter_data_53={chapterDataMap["5,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['5.3'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['5.3'], sectionColumnMap['5.3']) && (
                        <div className="page-section01">
                            <Section_53
                                section_53_data={propertyData['5.3']}
                                chapter_data_53={chapterDataMap["5,3"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* !propertyData['5.4'].isFirstRowEmpty */}
                {/* {!propertyData['5.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_54 section_54_data={propertyData['5.4']} chapter_data_54={chapterDataMap["5,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['5.4'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['5.4'], sectionColumnMap['5.4']) && (
                        <div className="page-section01">
                            <Section_54
                                section_54_data={propertyData['5.4']}
                                chapter_data_54={chapterDataMap["5,4"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* !propertyData['5.5'].isFirstRowEmpty */}
                {/* {!propertyData['5.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_55 section_55_data={propertyData['5.5']} chapter_data_55={chapterDataMap["5,5"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['5.5'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['5.5'], sectionColumnMap['5.5']) && (
                        <div className="page-section01">
                            <Section_55
                                section_55_data={propertyData['5.5']}
                                chapter_data_55={chapterDataMap["5,5"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* !propertyData['5.6'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_56 section_56_data={propertyData['5.6']} chapter_data_56={chapterDataMap["5,6"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.7'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_57 section_57_data={propertyData['5.7']} chapter_data_57={chapterDataMap["5,7"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.8'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_58 section_58_data={propertyData['5.8']} chapter_data_58={chapterDataMap["5,8"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.9'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_59 section_59_data={propertyData['5.9']} chapter_data_59={chapterDataMap["5,9"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.10'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_510 section_521_data={propertyData['5.2.1']} chapter_data_521={chapterDataMap["5,2,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* ========================================================================================================= */}

                {/* {!propertyData['6.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_61 section_61_data={propertyData['6.1']} chapter_data_61={chapterDataMap["6,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['6.1'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['6.1'], sectionColumnMap['6.1']) && (
                        <div className="page-section01">
                            <Section_61
                                section_61_data={propertyData['6.1']}
                                chapter_data_61={chapterDataMap["6,1"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* ========================================================================================================= */}

                {/* !propertyData['6.2'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_62 section_62_data={propertyData['6.2']} chapter_data_62={chapterDataMap["6,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* ========================================================================================================= */}



                {/* {!propertyData['7.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_71 section_71_data={propertyData['7.1']} chapter_data_71={chapterDataMap["7,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                } */}
                {propertyData['7.1'].isFirstRowEmpty === false &&
                    !isSectionAllRowsEmpty(propertyData['7.1'], sectionColumnMap['7.1']) && (
                        <div className="page-section01">
                            <Section_71
                                section_71_data={propertyData['7.1']}
                                chapter_data_71={chapterDataMap["7,1"]}
                                property_Frequency_Data={property_Frequency_Data}
                            />
                        </div>
                    )
                }


                {/* !propertyData['7.2'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_72 section_72_data={propertyData['7.2']} chapter_data_72={chapterDataMap["7,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['3.1'].isFirstRowEmpty */}
                {(propertyData['FD'].data.rows != undefined) &&
                    <div className="page-section01">
                        <FDSection chapter_data_31={chapterDataMap["3,1"]} FDSection_data={propertyData['FD']} SPLibraryName={SPLibraryName} form_Id={form_Id} />
                    </div>
                }
            </div >

            {isLoading && (
                <Loder />
            )}
        </>
    );
};

export default FirstSection;
