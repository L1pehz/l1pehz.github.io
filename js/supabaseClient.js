// Configuracao do Cliente Supabase para Bonetti Store

// Substitua com as credenciais do seu projeto Supabase (disponiveis em Project Settings > API)
const SUPABASE_URL = (typeof window !== 'undefined' && window.SUPABASE_URL) || 'https://sua-url-supabase.supabase.co';
const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) || 'sua-chave-anon-publica';

let supabaseClient = null;

function getSupabaseClient() {
  if (!supabaseClient && typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

/**
 * Busca a lista de produtos cadastrados no banco SQL do Supabase.
 * @returns {Promise<Array>} Lista de produtos
 */
async function fetchProducts() {
  const client = getSupabaseClient();
  if (!client) {
    console.warn('Supabase client nao inicializado. Verifique se o script do Supabase CDN foi carregado.');
    return [];
  }

  const { data, error } = await client
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar produtos do Supabase:', error);
    return [];
  }

  return data || [];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchProducts, getSupabaseClient, SUPABASE_URL, SUPABASE_ANON_KEY };
}
