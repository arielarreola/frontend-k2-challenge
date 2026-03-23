import { http, HttpResponse } from "msw";
import type { Product } from "../../lib/models/product.model";

// Función para obtener productos del usuario actual
const getUserProducts = (): Product[] => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.products || [];
};

// Función para guardar productos del usuario actual
const saveUserProducts = (products: Product[]) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const updatedUser = { ...user, products };
  localStorage.setItem("user", JSON.stringify(updatedUser));
};

// categorias fijas sugeridas
export const categories = [
  { id: 1, name: "Postres" },
  { id: 2, name: "Botanas" },
  { id: 3, name: "Bebidas" },
];
// Obtener productos del usuario o usar productos por defecto
let products: Product[] =
  getUserProducts().length > 0
    ? getUserProducts()
    : [
        //datos sugeridos para el desafio
        // {
        //   id: 1,
        //   name: "Donas glaseadas",
        //   price: 10,
        //   stock: 35,
        //   category: { id: 1, name: "Postres" },
        // },
        // {
        //   id: 2,
        //   name: "Papas fritas con Limón",
        //   price: 29.99,
        //   stock: 50,
        //   category: { id: 2, name: "Botanas" },
        // },
        // {
        //   id: 3,
        //   name: "Refresco de naranja",
        //   price: 12,
        //   stock: 25,
        //   category: { id: 3, name: "Bebidas" },
        // },
      ];

let nextId = Math.max(...products.map((p) => p.id), 0) + 1;

export const productsHandlers = [
  // GET products
  http.get("/api/products", () => {
    console.log("✅ Mock GET /api/products called, returning:", products);
    return HttpResponse.json(
      {
        success: true,
        data: products,
        message: "Products obtenidos",
      },
      { status: 200 },
    );
  }),

  //get product by id
  http.get("/api/products/:id", ({ params }) => {
    const id = Number(params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        { success: false, message: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: product,
      message: "Producto obtenido",
    });
  }),
  //post product
  http.post("/api/products", async ({ request }) => {
    try {
      const newProduct = (await request.json()) as Omit<Product, "id">;
      console.log("Debug + producto recibido:", newProduct);

      const product: Product = {
        id: nextId++,
        ...newProduct,
      };

      console.log("Created product:", product);
      products.push(product);

      // Guardar en localStorage del usuario
      saveUserProducts(products);

      return HttpResponse.json(
        {
          success: true,
          data: product,
          message: "Producto creado exitosamente",
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error en mock POST products:", error);
      return HttpResponse.json(
        { success: false, message: "Solicitud inválida de datos" },
        { status: 400 },
      );
    }
  }),

  //delete product
  http.delete("/api/products/:id", async ({ params }) => {
    try {
      const id = Number(params.id);
      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        return HttpResponse.json(
          { success: false, message: "Producto no encontrado" },
          { status: 404 },
        );
      }

      const deletedProduct = products.splice(productIndex, 1)[0];

      // Guardar en localStorage del usuario
      saveUserProducts(products);

      return HttpResponse.json({
        success: true,
        data: deletedProduct,
        message: "Producto eliminado exitosamente",
      });
    } catch (error) {
      console.error("Error en mock DELETE products:", error);
      return HttpResponse.json(
        { success: false, message: "Error al eliminar el producto" },
        { status: 500 },
      );
    }
  }),
  http.get("/api/categories", () => {
    return HttpResponse.json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  }),
  //simular registro y login
  http.get("/login", () => {
    return;
  }),
  http.get("/register", () => {
    return;
  }),
  http.get("/dashboard", () => {
    return;
  }),
  http.get("/products", () => {
    return;
  }),
];
