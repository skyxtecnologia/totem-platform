import * as path from "node:path";
import { config as dotenvConfig } from "dotenv";

// Load .env
dotenvConfig({ path: path.resolve(process.cwd(), "../../.env") });
dotenvConfig();

import { db } from "./index";
import {
  adCampaigns,
  adCreatives,
  events,
  hotels,
  pois,
  tenants,
  utilities,
} from "./schema";

async function main() {
  console.log("🌱 Começando o seeding do banco de dados...");

  try {
    // 1. Criar o Tenant (Macaé Smart Tour)
    const testTenantId = "tenant_macae_001";

    // Deletar dados antigos para evitar conflitos de ID
    await db.delete(pois);
    await db.delete(hotels);
    await db.delete(events);
    await db.delete(utilities);
    await db.delete(adCreatives);
    await db.delete(adCampaigns);
    await db.delete(tenants);

    await db.insert(tenants).values({
      id: testTenantId,
      name: "Macaé Smart Tour",
      slug: "macae",
      settings: { theme: "dark", lang: "pt-BR" },
    });
    console.log("✅ Tenant criado com ID:", testTenantId);

    // 2. Inserir um Ponto de Interesse (Praia do Pecado)
    await db.insert(pois).values({
      id: "poi_pecado_001",
      tenantId: testTenantId,
      name: "Praia do Pecado",
      description: "A melhor praia para a prática de surf e esportes em Macaé.",
      category: "beach",
      latitude: -22.4043,
      longitude: -41.7963,
      googlePlaceId: "ChIJ_fV0Xlq8mwAR_tD676L_D7I",
      address: "Avenida Principal da Praia do Pecado, Macaé - RJ",
      bannerUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      photos: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
      accessibility: ["rampa", "banheiro_adaptado"],
      metadata: {
        waterCondition: "propria",
        activities: ["Surf", "Caminhada", "Pôr do Sol"],
      },
    });
    console.log("✅ POI da Praia do Pecado criado!");

    // 3. Inserir um Hotel (Royal Atlantic Hotel)
    await db.insert(hotels).values({
      id: "hotel_royal_001",
      tenantId: testTenantId,
      name: "Royal Atlantic Hotel",
      rating: 4.7,
      neighborhood: "Cavaleiros",
      priceRange: "R$ 350 - R$ 600",
      amenities: ["wifi", "piscina", "academia", "cafe_da_manha"],
      photoUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      latitude: -22.4089,
      longitude: -41.8021,
    });
    console.log("✅ Hotel Royal Atlantic criado!");

    // 4. Inserir um Evento (Festival de Frutos do Mar)
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await db.insert(events).values({
      id: "event_festival_001",
      tenantId: testTenantId,
      title: "Festival de Frutos do Mar 2026",
      description:
        "O maior evento gastronômico da região serrana e praiana de Macaé.",
      category: "gastronomy",
      location: "Orla dos Cavaleiros",
      latitude: -22.4072,
      longitude: -41.7998,
      startDate: new Date(),
      endDate: nextMonth,
      isFeatured: true,
      price: 0, // Gratuito
      ticketUrl: "https://sympla.com.br/macae-gastronomia",
      bannerUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    });
    console.log("✅ Evento Festival Gastronômico criado!");

    // 5. Inserir uma Utilidade Pública (HPM - Hospital Público Municipal)
    await db.insert(utilities).values({
      id: "utility_hpm_001",
      tenantId: testTenantId,
      name: "HPM - Hospital Público Municipal",
      description: "Atendimento de urgência e emergência 24h.",
      category: "health",
      subCategory: "hospital",
      phone: "(22) 2773-0061",
      address: "Rodovia RJ-168, km 4, Macaé - RJ",
      status: "aberto_24h",
      operatingHours: "24h",
      latitude: -22.3789,
      longitude: -41.8102,
    });
    console.log("✅ Utilidade de Saúde HPM criada!");

    // 6. Inserir um Anúncio (Vigente para a idle screen)
    const adCampaignId = "camp_ads_001";
    await db.insert(adCampaigns).values({
      id: adCampaignId,
      tenantId: testTenantId,
      name: "Verão Macaé Smart Tour 2026",
      startDate: new Date(Date.now() - 3600000 * 24), // ontem
      endDate: nextMonth, // mês que vem
      isActive: true,
    });

    await db.insert(adCreatives).values({
      id: "creative_ads_001",
      campaignId: adCampaignId,
      title: "Visite o Sana - Paraíso das Cachoeiras",
      mediaUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      mediaType: "image",
      ctaUrl: "https://macae.rj.gov.br/sana",
      durationSeconds: 15,
    });
    console.log("✅ Anúncio publicitário do Sana criado!");

    console.log("🌱 Seeding concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Falha no seeding:", error);
    process.exit(1);
  }
}

main();
