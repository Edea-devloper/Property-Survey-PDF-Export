import * as React from 'react';
import styles from './ReviewerForm.module.scss';
import { formatDateToDDMMYYYY } from '../../Utility/utils';

export const ReviewerForm: React.FC = (props) => {
  console.log(props)
  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        פרויקט א - נתוני הנס וניטוא .ashkdvbaukdvb
      </div>
      <div className={styles.subHeader}>כללי סוקר</div>

      {/* First Row */}
      <div className={styles.formRow}>
        <input type="checkbox" className={styles.checkbox} />
        <div className={styles.formGroup}>
          <label className={styles.label}>כתובת דואר אלקטרוני</label>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>טלפון נייד</label>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תפקיד</label>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>מציג הבריאות</label>
          <input type="text" className={styles.input} value="[object Object]" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תאריך ביצוע הסקר</label>
          <input type="date" className={styles.dateInput} value={formatDateToDDMMYYYY("2025-04-29")} />
        </div>
      </div>

      <div className={styles.addRow}>+ להוסיף שורה</div>
      <div className={styles.rowDivider}></div>

      {/* Second Row */}
      <div className={styles.formRow}>
        <input type="checkbox" className={styles.checkbox} />
        <div className={styles.formGroup}>
          <label className={styles.label}>כתובת דואר אלקטרוני</label>
          <input type="text" className={styles.input} value="Mickey@any.com" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>טלפון נייד</label>
          <input type="text" className={styles.input} value="4464677888" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>תפקיד</label>
          <input type="text" className={styles.input} value="TEST2" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>שם ומשפחה</label>
          <input type="text" className={styles.input} value="TEST2" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>מציג תחנה משרד הבריאות</label>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      </div>

      <div className={styles.addRow}>+ להוסיף שורה</div>
    </div>
  );
};

export default ReviewerForm;
