import { SaleRecord } from '../types';

export function parseCSV(csvText: string): SaleRecord[] {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const records: SaleRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith(',,,,')) continue;
    
    // Regex to parse comma-separated fields with quoted values
    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const matches: string[] = [];
    let match: RegExpExecArray | null;
    
    while ((match = regex.exec(line)) !== null) {
      let val = match[1] ?? '';
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      matches.push(val.trim());
      if (regex.lastIndex === line.length) break;
    }

    if (matches.length >= 14) {
      const brand = (matches[0] || 'Unknown').toLowerCase();
      const orderedDate = matches[1] || '2026-08-01';
      const city = (matches[2] || 'Unknown').toLowerCase();
      const areaName = (matches[3] || 'Unknown').toLowerCase();
      const storeId = matches[4] || 'N/A';
      const l1Category = (matches[5] || 'General').toLowerCase();
      const l2Category = (matches[6] || 'General').toLowerCase();
      const l3Category = (matches[7] || 'General').toLowerCase();
      const productName = matches[8] || 'Product';
      const variant = matches[9] || 'Standard';
      const itemCode = matches[10] || 'SKU';
      const combo = matches[11] || 'No';
      const baseMrp = parseFloat(matches[12]) || 0;
      const unitsSold = parseInt(matches[13], 10) || 1;
      const gmv = parseFloat(matches[14]) || (baseMrp * unitsSold);

      records.push({
        id: `rec-${i}-${Date.now().toString(36)}`,
        brand,
        orderedDate,
        city,
        areaName,
        storeId,
        l1Category,
        l2Category,
        l3Category,
        productName,
        variant,
        itemCode,
        combo: combo.toLowerCase() === 'yes' ? 'Yes' : 'No',
        baseMrp,
        unitsSold,
        gmv
      });
    }
  }

  return records;
}

// Initial state is empty as requested ("excel sheet ar demo data gulo remove koro")
export const INITIAL_SALES_DATA: SaleRecord[] = [];
