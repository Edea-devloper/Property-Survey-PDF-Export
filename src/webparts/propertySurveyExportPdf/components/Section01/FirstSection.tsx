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
import * as XLSX from "xlsx";
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

    const formFields: { label: string; value: any }[] = [
        { label: "מספר ישות עסקית", value: listitems?.BusinessEntity },
        { label: "כתובת (ישוב, רחוב ומספר בית)", value: Lookup_Field_Section_1[10] },
        { label: "שם היחידה/יחידות מאוכלסות", value: Lookup_Field_Section_1[9] },
        { label: "גוש", value: Lookup_Field_Section_1[8] },
        { label: "חלקה", value: Lookup_Field_Section_1[7] },
        { label: "שם המבנה", value: Lookup_Field_Section_1[6] },
        { label: "תיאור המבנה", value: Lookup_Field_Section_1[5] },
        { label: "מועד סיום שכירות", value: formatDateToDDMMYYYY(Lookup_Field_Section_1[3]) },
        { label: "סוג הנכס", value: Lookup_Field_Section_1[2] },
        { label: "תיאור כללי", value: Lookup_Field_Section_1[1] },
        { label: "אזור / שכונה", value: Lookup_Field_Section_1[0] },
        { label: "תיאור השירות (למי ניתן השירות)", value: Lookup_Field_Section_2[21] },
        { label: "קהל היעד", value: Lookup_Field_Section_2[20] },
        { label: "מספר מקבלי שירות", value: Lookup_Field_Section_2[19] },
        { label: "שעות פעילות", value: Lookup_Field_Section_2[18] },
        { label: "שטח בנוי ברוטו (מ״ר)", value: Lookup_Field_Section_2[17] },
        { label: "מספר הקומות בנכס", value: Lookup_Field_Section_2[16] },
        { label: "הקומה בה נמצאת היחידה", value: Lookup_Field_Section_2[15] },
        { label: "מספר חדרים / משרדים למתן שירות", value: Lookup_Field_Section_2[14] },
        { label: "(שטח המגרש - שטח פתוח מ״ר)", value: Lookup_Field_Section_2[13] },
        { label: "מקומות חניה צמודים למבנה / בהסדר", value: Lookup_Field_Section_2[12] },
        { label: "מקומות חניה - לאנשים עם מוגבלות", value: Lookup_Field_Section_2[11] },
        { label: "מקומות חניה - לעובדים", value: Lookup_Field_Section_2[10] },
        { label: "מקומות חניה - לאורחים / קהל", value: Lookup_Field_Section_2[9] },
        { label: "מקומות חניה של המשרד בנכס", value: Lookup_Field_Section_2[8] },
        { label: "מספר עובדים בנכס", value: Lookup_Field_Section_2[7] },
        { label: "שם החברה לניהול/תחזוקת הנכס", value: Lookup_Field_Section_2[6] },
        { label: "מס עובדים מתחזקים את הנכס ובאיזה משרה", value: Lookup_Field_Section_2[5] },
        { label: "סוג מבנה", value: listitems?.SealStructure?.split("||")[0] },
        { label: "סוג גג ואיטום", value: listitems?.SealStructure?.split("||")[1] },
        { label: "מספר מבנה", value: Lookup_Field_Section_2[2] },
        { label: "מספר קומה", value: Lookup_Field_Section_2[1] },
        { label: "שטח המשרדים בארנונה", value: Lookup_Field_Section_2[0] }
    ];

    // 🔹 Reusable: form fields to AOA (from props, no checkboxes)
    const formSectionToAOA = (
        fields: { label: string; value: any }[]
    ): string[][] => {
        return fields?.map(f => [f.label, f.value ?? ""]);
    };

    // 🔹 Table to AOA (same as before, skip checkboxes)
    const tableToAOA = (table: HTMLTableElement): string[][] => {
        const rows: string[][] = [];
        table.querySelectorAll("tr").forEach((tr) => {
            const row: string[] = [];
            tr.querySelectorAll("th, td").forEach((cell) => {
                let value = cell.textContent?.trim() || "";

                const input = cell.querySelector("input, select, textarea") as
                    | HTMLInputElement
                    | HTMLSelectElement
                    | HTMLTextAreaElement
                    | null;

                if (input) {
                    if (input instanceof HTMLInputElement) {
                        if (input.type === "checkbox") {
                            value = ""; // ❌ skip checkboxes
                        } else {
                            value = input.value;
                        }
                    } else if (input instanceof HTMLSelectElement) {
                        value = input.options[input.selectedIndex]?.text || "";
                    } else if (input instanceof HTMLTextAreaElement) {
                        value = input.value;
                    }
                }

                row.push(value);
            });
            rows.push(row);
        });
        return rows;
    };

    // 🔹 Main export
    const exportAllToExcel = (
        fieldsA: { label: string; value: any }[],
        tableAId: string,
        fieldsB: { label: string; value: any }[],
        tableBId: string,
        formFields: { label: string; value: any }[],
        tables: { id: string; title: string }[],
        fileName: string
    ) => {
        const aoa: string[][] = [];

        // Field Section A
        // aoa.push(["Section A Fields"]);
        // aoa.push([]);
        aoa.push(...formSectionToAOA(fieldsA));
        aoa.push([], []);

        // Table A
        // aoa.push(["Section A Table"]);
        const tableA = document.getElementById(tableAId) as HTMLTableElement | null;
        if (tableA) aoa.push(...tableToAOA(tableA));
        aoa.push([], [], []);

        // Field Section B
        // aoa.push(["Section B Fields"]);
        // aoa.push([]);
        aoa.push(...formSectionToAOA(fieldsB));
        aoa.push([], []);

        // Table B
        // aoa.push(["נציגי התחנה משרד הבריאות"]);
        const tableB = document.getElementById(tableBId) as HTMLTableElement | null;
        if (tableB) aoa.push(...tableToAOA(tableB));
        aoa.push([], [], []);

        // Main Form
        aoa.push(["פרטי הנכס, נתונים כמותיים של הנכס - 2.3, 2.2, 2.1"]);
        aoa.push([]);
        aoa.push(...formSectionToAOA(formFields));
        aoa.push([], [], []);

        // Remaining tables
        tables.forEach((tbl, index) => {
            aoa.push([tbl.title]);
            const table = document.getElementById(tbl.id) as HTMLTableElement | null;
            if (table) aoa.push(...tableToAOA(table));
            if (index < tables.length - 1) aoa.push([], [], []);
        });

        // Build workbook
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Export");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `${fileName}.xlsx`);
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
                const MAX_ROWS = 21;

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

                inputs.forEach(input => {
                    originalStyles.push(input.style.cssText);
                    input.style.textAlign = 'right';
                    input.style.direction = 'rtl';
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

                const canvas = await html2canvas(section, {
                    scale: 2,
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
                            'PNG',
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
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('שגיאה ביצירת ה-PDF. אנא נסה שוב.');
        } finally {
            setIsLoading(false);
        }
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
                            <span>אגף רכש נכסים ולוגיסטיקה</span>
                        </div>
                        <img src={AvivLogo} alt="Ministry Logo" className="logo" />
                    </div>

                    <div className="form-toolbar">
                        {/* <div className="form-title">ערוך טופס {listitems?.Form_ID} יחידה מאכלסת:{stripHtmlTags(Lookup_Field_Section_1[9]) || ''} כתובת: {Lookup_Field_Section_1[10] || ''}</div> */}
                        <div className="form-title">ערוך טופס
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
                                    exportAllToExcel([
                                        { label: "תאריך ביצוע הסקר", value: formatDateToDDMMYYYY(listitems?.Date?.split('T')[0]) },
                                        { label: "", value: "" }
                                    ],
                                        "table11",

                                        [
                                            { label: "מספר טופס", value: listitems?.Date?.split('T')[0] },
                                            { label: "", value: "" }
                                        ],
                                        "table12",


                                        // Your 33 form fields go here
                                        formFields,
                                        [
                                            { id: "table241", title: "2.4.1 -  עירייה  ארנונה" },
                                            { id: "table242", title: "2.4.2 - תאגיד המים" },
                                            { id: "table243", title: "2.4.3 - חברת חשמל" },
                                            { id: "table244", title: "2.4.4 - ניקיון" },
                                            { id: "table245", title: "2.4.5 - אבטחה" },
                                            { id: "table246", title: "2.4.6 - ועד הביניין" },
                                            { id: "table247", title: "2.4.7 - חניות" },
                                            { id: "table248", title: "2.4.8 - ...להוסיף אחר" },

                                            { id: "table25", title: "2.5 -בעלי תפקידים בניהול ותחזוקת הנכס" },
                                            { id: "table26", title: "2.6 - תכניות של הנכס" },
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
                                            // { id: "table522", title: "5.2.2 -  קירות חיצוניים" },
                                            { id: "table53", title: "5.3 - ריצוף /דק /שטיחים/קרמיקה" },
                                            { id: "table54", title: "5.4 - דלתות ומשקופים" },
                                            { id: "table55", title: "5.5 - חלונות/ זכוכיות/ רשתות/ סורגים" },
                                            // { id: "table56", title: "5.6 - חדירות מים/ נזילות" },
                                            // { id: "table57", title: "5.7 - כסאות וריהוט משרדי" },
                                            // { id: "table58", title: "5.8 - חניות " },
                                            // { id: "table59", title: "5.9 - חצרות (כבישים ומדרכות)" },

                                            { id: "table61", title: "6.1 - במבנה" },
                                            // { id: "table62", title: "6.2 - גינון וחצר" },

                                            { id: "table71", title: "7.1 - חשמל" },
                                            // { id: "table72", title: "7.2 - מיזוג אוויר" }
                                        ],
                                        `PropertySurveyExport_Form_${listitems.Form_ID}.pdf`
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
                                    <input type="checkbox" style={{ width: "15px", height: "25px", marginTop: 0 }} value={formatDateToDDMMYYYY(listitems?.Date?.split('T')[0])} />
                                </div>
                                <input className='section1_Gal1_CustomeField_input' type="text" value={formatDateToDDMMYYYY(listitems.Date?.split('T')[0])} />
                            </div>

                            <div className='section1_Gal1_table_container'>
                                <table id='table11'>
                                    <tr><th colSpan={2}>נציגי "אביב" ניהול הנדסה ומערכות מידע בע"מ - מינהלת נכסים משרד הבריאות</th></tr>
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

                    <Section02 listitems={listitems} Lookup_Field_Section_1={Lookup_Field_Section_1} Lookup_Field_Section_2={Lookup_Field_Section_2} Lease_Expiration_Date={Lease_Expiration_Date} ContractNumber={ContractNumber} />
                </div>




                {shouldShowSection &&
                    <div className="page-section01">
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

                {!propertyData['2.5'].isFirstRowEmpty &&
                    <Section_25 section_25_data={propertyData['2.5']} NumberofOps={NumberofOps} />
                }


                {!propertyData['2.6'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_26 section_26_data={propertyData['2.6']} />
                    </div>
                }

                {!propertyData['2.7'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_27 section_27_data={propertyData['2.7']} chapter_data_27={chapterDataMap["2,7"]} />
                    </div>
                }

                {!propertyData['3.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_31 section_31_data={propertyData['3.1']} chapter_data_31={chapterDataMap["3,1"]} />
                    </div>
                }

                {!propertyData['3.2'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_32 section_32_data={propertyData['3.2']} chapter_data_32={chapterDataMap["3,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['3.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_33 section_33_data={propertyData['3.3']} chapter_data_33={chapterDataMap["3,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['3.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_34 section_34_data={propertyData['3.4']} chapter_data_34={chapterDataMap["3,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['3.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_35 section_35_data={propertyData['3.5']} chapter_data_35={chapterDataMap["3,5"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['4.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_41 section_41_data={propertyData['4.1']} chapter_data_41={chapterDataMap["4,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['4.2'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_42 section_42_data={propertyData['4.2']} chapter_data_42={chapterDataMap["4,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['4.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_43 section_43_data={propertyData['4.3']} chapter_data_43={chapterDataMap["4,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['4.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_44 section_44_data={propertyData['4.4']} chapter_data_44={chapterDataMap["4,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* here implement Section 4.5 */}
                {!propertyData['4.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_45 section_44_data={propertyData['4.5']} chapter_data_44={chapterDataMap["4,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['5.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_51 section_51_data={propertyData['5.1']} chapter_data_51={chapterDataMap["5,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {!propertyData['5.2.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_521 section_521_data={propertyData['5.2.1']} chapter_data_521={chapterDataMap["5,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* ========================================================================================================= */}

                {/* !propertyData['5.2.2'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_522 section_521_data={propertyData['5.2.2']} chapter_data_521={chapterDataMap["5,2,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.3'].isFirstRowEmpty */}
                {!propertyData['5.3'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_53 section_53_data={propertyData['5.3']} chapter_data_53={chapterDataMap["5,3"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.4'].isFirstRowEmpty */}
                {!propertyData['5.4'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_54 section_54_data={propertyData['5.4']} chapter_data_54={chapterDataMap["5,4"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* !propertyData['5.5'].isFirstRowEmpty */}
                {!propertyData['5.5'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_55 section_55_data={propertyData['5.5']} chapter_data_55={chapterDataMap["5,5"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
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

                {!propertyData['6.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_61 section_61_data={propertyData['6.1']} chapter_data_61={chapterDataMap["6,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* ========================================================================================================= */}

                {/* !propertyData['6.2'].isFirstRowEmpty */}
                {false &&
                    <div className="page-section01">
                        <Section_62 section_62_data={propertyData['6.2']} chapter_data_62={chapterDataMap["6,2"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
                }

                {/* ========================================================================================================= */}



                {!propertyData['7.1'].isFirstRowEmpty &&
                    <div className="page-section01">
                        <Section_71 section_71_data={propertyData['7.1']} chapter_data_71={chapterDataMap["7,1"]} property_Frequency_Data={property_Frequency_Data} />
                    </div>
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
