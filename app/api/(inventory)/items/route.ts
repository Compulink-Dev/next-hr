// app/api/(inventory)/items/route.ts
export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// Helper function to validate MongoDB ObjectID
function isValidObjectId(id: string): boolean {
  return !!id && /^[0-9a-fA-F]{24}$/.test(id);
}

export async function POST(request: Request) {
  try {
    const itemData = await request.json();
    console.log("Received item data:", itemData);

    // Validate required fields
    if (!itemData.name || !itemData.categoryId || !itemData.warehouseId) {
      return NextResponse.json(
        { error: "Name, category, and warehouse are required" },
        { status: 400 }
      );
    }

    // Validate ObjectID fields
    if (!isValidObjectId(itemData.categoryId)) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    if (!isValidObjectId(itemData.warehouseId)) {
      return NextResponse.json({ error: "Invalid warehouse ID" }, { status: 400 });
    }

    // Get warehouse and update stock
    const warehouse = await db.warehouse.findUnique({
      where: { id: itemData.warehouseId },
    });

    if (!warehouse) {
      return NextResponse.json({ error: "Warehouse not found" }, { status: 404 });
    }

    const currentWarehouseStock = warehouse.stockQty;
    const newStockQty = currentWarehouseStock + (parseInt(itemData.quantity) || 0);

    console.log("Updating warehouse stock:", { currentWarehouseStock, newStockQty });

    // Update warehouse stock
    await db.warehouse.update({
      where: { id: itemData.warehouseId },
      data: { stockQty: newStockQty },
    });

    // Prepare item data using connect for relations
    const itemCreateData: any = {
      name: itemData.name,
      description: itemData.description || null,
      sku: itemData.sku || null,
      barcode: itemData.barcode || null,
      quantity: parseInt(itemData.quantity) || 0,
      sellingPrice: parseFloat(itemData.sellingPrice) || 0,
      buyingPrice: parseFloat(itemData.buyingPrice) || 0,
      reOrderPoint: parseInt(itemData.reOrderPoint) || 0,
      weight: itemData.weight ? parseFloat(itemData.weight) : null,
      dimensions: itemData.dimensions || null,
      taxRate: itemData.taxRate ? parseFloat(itemData.taxRate) : 0,
      notes: itemData.notes || null,
      // Use connect for required relations
      category: {
        connect: { id: itemData.categoryId }
      },
      warehouse: {
        connect: { id: itemData.warehouseId }
      }
    };

    // Handle imageUrl - provide a default value if empty
    if (itemData.imageUrl && itemData.imageUrl.trim() !== '') {
      itemCreateData.imageUrl = itemData.imageUrl;
    } else {
      // Provide a default image URL or empty string based on your schema
      itemCreateData.imageUrl = ''; // or use a default image URL
    }

    // Only add optional relations if they are valid
    if (itemData.unitId && isValidObjectId(itemData.unitId)) {
      itemCreateData.unit = { connect: { id: itemData.unitId } };
    }

    if (itemData.brandId && isValidObjectId(itemData.brandId)) {
      itemCreateData.brand = { connect: { id: itemData.brandId } };
    }

    if (itemData.supplierId && isValidObjectId(itemData.supplierId)) {
      itemCreateData.supplier = { connect: { id: itemData.supplierId } };
    }

    console.log("Creating item with data:", itemCreateData);

    // Create the item
    const item = await db.item.create({
      data: itemCreateData,
    });

    console.log("Item created successfully:", item);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error, message: "Failed to create item" },
      { status: 500 }
    );
  }
}

// app/api/(inventory)/items/route.ts - GET method
export async function GET(request: Request) {
  try {
    const items = await db.item.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true }
        },
        supplier: {
          select: { name: true }
        },
        brand: {
          select: { name: true }
        },
        unit: {
          select: { name: true }
        },
        warehouse: {
          select: { name: true }
        },
      },
    });

    // Transform the data to handle MongoDB nested objects
    const transformedItems = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      categoryId: item.categoryId,
      sku: item.sku,
      barcode: item.barcode,
      quantity: item.quantity,
      unitId: item.unitId,
      brandId: item.brandId,
      supplierId: item.supplierId,
      warehouseId: item.warehouseId,
      sellingPrice: item.sellingPrice,
      buyingPrice: item.buyingPrice,
      reOrderPoint: item.reOrderPoint,
      weight: item.weight,
      imageUrl: item.imageUrl,
      dimensions: item.dimensions,
      taxRate: item.taxRate,
      notes: item.notes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      category: item.category ? { name: item.category.name } : null,
      supplier: item.supplier ? { name: item.supplier.name } : null,
      brand: item.brand ? { name: item.brand.name } : null,
      unit: item.unit ? { name: item.unit.name } : null,
      warehouse: item.warehouse ? { name: item.warehouse.name } : null,
    }));

    return NextResponse.json(transformedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json([]);
  }
}