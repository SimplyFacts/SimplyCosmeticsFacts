// Lookup product from external API (Open Beauty Facts)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const barcode = searchParams.get("barcode");

    if (!barcode) {
      return Response.json({ error: "Barcode is required" }, { status: 400 });
    }

    // Use Open Beauty Facts API to lookup product information
    const response = await fetch(
      `https://world.openbeautyfacts.org/api/v0/product/${barcode}.json`,
    );

    if (!response.ok) {
      return Response.json(
        { error: "Failed to lookup product" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.status === 0) {
      return Response.json(
        { error: "Product not found in database" },
        { status: 404 },
      );
    }

    const product = data.product;

    // Format the response using only Open Food Facts recognized allergens
    const formattedProduct = {
      barcode: barcode,
      name: product.product_name || "Unknown Product",
      brand: product.brands || null,
      ingredients: product.ingredients_text || null,
      allergens: product.allergens_tags || [],
      traces: product.traces_tags || [],
      crossContaminationWarnings: [],
      additives_tags: product.additives_tags || [],
      ingredients_analysis_tags: product.ingredients_analysis_tags || [],
      ingredients_tags: product.ingredients_tags || [],
      nutritional_info: {
        energy_kcal: product.nutriments?.["energy-kcal"] || null,
        fat: product.nutriments?.fat || null,
        saturated_fat: product.nutriments?.["saturated-fat"] || null,
        carbohydrates: product.nutriments?.carbohydrates || null,
        sugars: product.nutriments?.sugars || null,
        fiber: product.nutriments?.fiber || null,
        proteins: product.nutriments?.proteins || null,
        salt: product.nutriments?.salt || null,
        sodium: product.nutriments?.sodium || null,
      },
      image_url: product.image_url || product.image_front_url || null,
    };

    return Response.json(formattedProduct);
  } catch (error) {
    console.error("Error looking up product:", error);
    return Response.json(
      { error: "Failed to lookup product" },
      { status: 500 },
    );
  }
}
