fetch(
  "https://api.totem-plataform.workers.dev/api/v1/pois?tenantId=tenant_macae_001",
)
  .then((res) => res.json())
  .then((data) =>
    console.log("🎉 Resposta de Produção:", JSON.stringify(data, null, 2)),
  )
  .catch((err) => console.error("Erro:", err));
