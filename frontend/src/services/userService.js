export async function getCurrentUser(accessToken) {
  let response;

  try {
    response = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch {
    throw new Error("Não foi possível contactar a API. Confirma se o backend está ligado.");
  }

  if (!response.ok) {
    const statusMessages = {
      401: "A sessão é inválida ou o token expirou.",
      404: "Não existe um perfil local associado a esta conta.",
      500: "O backend encontrou um erro interno.",
    };
    const explanation = statusMessages[response.status]
      ?? "A API não conseguiu concluir o pedido.";
    throw new Error(`A API respondeu com erro ${response.status}. ${explanation}`);
  }

  return response.json();
}
