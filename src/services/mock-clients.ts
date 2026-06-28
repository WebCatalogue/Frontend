import type { Client } from "@/types/agency";

const MOCK_CLIENTS: Client[] = [
  {
    id: "client-001",
    businessName: "Sunrise Café",
    ownerName: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya@sunrisecafe.in",
    industry: "Café",
    projectStatus: "new-enquiry",
    currentPlan: "Starter Website",
    lastContact: "2026-06-28",
    notes: "Interested in online menu integration.",
    projectsCount: 1,
    createdAt: "2026-06-28T09:15:00Z",
  },
  {
    id: "client-002",
    businessName: "Bella Salon",
    ownerName: "Anita Desai",
    phone: "+91 99887 76655",
    email: "anita@bellasalon.in",
    industry: "Salon",
    website: "bellasalon.in",
    projectStatus: "our-todo",
    currentPlan: "Premium Website",
    lastContact: "2026-06-27",
    notes: "Referred by Harbor Coffee owner.",
    projectsCount: 1,
    createdAt: "2026-06-25T10:00:00Z",
  },
  {
    id: "client-003",
    businessName: "Spice Route Restaurant",
    ownerName: "Vikram Patel",
    phone: "+91 97654 32109",
    email: "vikram@spiceroute.in",
    industry: "Restaurant",
    projectStatus: "development",
    currentPlan: "Premium Website + Menu",
    lastContact: "2026-06-28",
    projectsCount: 1,
    createdAt: "2026-06-10T08:00:00Z",
  },
  {
    id: "client-004",
    businessName: "Greenfield Clinic",
    ownerName: "Dr. Meera Nair",
    phone: "+91 94444 55566",
    email: "dr.meera@greenfieldclinic.com",
    industry: "Clinic",
    website: "greenfieldclinic.com",
    projectStatus: "waiting-for-client",
    currentPlan: "Medical Website",
    lastContact: "2026-06-26",
    notes: "Waiting on final approval for colour scheme.",
    projectsCount: 1,
    createdAt: "2026-06-01T09:00:00Z",
  },
  {
    id: "client-005",
    businessName: "Harbor Coffee Co.",
    ownerName: "James Wilson",
    phone: "+91 98700 11223",
    email: "james@harborcoffee.in",
    industry: "Café",
    website: "harborcoffee.in",
    projectStatus: "completed",
    currentPlan: "Starter Website",
    lastContact: "2026-06-15",
    projectsCount: 2,
    createdAt: "2026-05-01T08:00:00Z",
  },
  {
    id: "client-006",
    businessName: "Atelier Salon",
    ownerName: "Sonia Kapoor",
    phone: "+91 98123 45678",
    email: "sonia@ateliersalon.in",
    industry: "Salon",
    website: "ateliersalon.in",
    projectStatus: "maintenance",
    currentPlan: "Maintenance Plan",
    lastContact: "2026-06-28",
    projectsCount: 1,
    createdAt: "2026-03-01T08:00:00Z",
  },
];

export async function fetchClients(): Promise<Client[]> {
  await delay(200);
  return structuredClone(MOCK_CLIENTS);
}

export async function fetchClientById(id: string): Promise<Client | null> {
  await delay(100);
  const client = MOCK_CLIENTS.find((c) => c.id === id);
  return client ? structuredClone(client) : null;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export { MOCK_CLIENTS };
