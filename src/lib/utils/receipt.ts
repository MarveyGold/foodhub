export const BUSINESS = {
  name: "Hadeva Bakes",
  tagline: "Cakes · Small Chops · Pastries",
  phone: "+234 805 025 7305",
};

export type ReceiptOrder = {
  _id: string;
  customerName: string;
  deliveryType: "pickup" | "delivery";
  address?: string;
  items: { name: string; flavour?: string; cost: number; quantity: number }[];
  total: number;
  createdAt: string;
  payment?: { method?: string; paidAt?: string };
};

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");

// last 6 chars of the Mongo id, e.g. "E4223F"
export const receiptNo = (id: string) => id.slice(-6).toUpperCase();

export const formatDate = (d?: string | Date) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "—";

const METHODS: Record<string, string> = {
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  pos: "POS",
  card: "Card",
};
export const paymentLabel = (m?: string) => (m ? (METHODS[m] ?? m) : "—");

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function below1000(n: number) {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const out: string[] = [];
  if (h) out.push(`${ones[h]} hundred`);
  if (r) {
    const t = r < 20 ? ones[r] : tens[Math.floor(r / 10)] + (r % 10 ? "-" + ones[r % 10] : "");
    out.push(h ? `and ${t}` : t);
  }
  return out.join(" ");
}

export function amountInWords(amount: number) {
  let rem = Math.round(amount);
  if (rem === 0) return "Zero naira only";
  const parts: string[] = [];
  for (const [v, name] of [[1e9, "billion"], [1e6, "million"], [1e3, "thousand"]] as const) {
    if (rem >= v) {
      parts.push(`${below1000(Math.floor(rem / v))} ${name}`);
      rem %= v;
    }
  }
  if (rem > 0) parts.push(parts.length && rem < 100 ? `and ${below1000(rem)}` : below1000(rem));
  const s = parts.join(" ");
  return `${s[0].toUpperCase()}${s.slice(1)} naira only`;
}
