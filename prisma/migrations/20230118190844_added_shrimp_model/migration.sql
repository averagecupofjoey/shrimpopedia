-- CreateTable
CREATE TABLE "Shrimp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "waterType" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "colorOne" TEXT NOT NULL,
    "colorTwo" TEXT NOT NULL,
    "morphType" TEXT NOT NULL,
    "notes" TEXT,
    "sale" BOOLEAN NOT NULL,
    "saleInfo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Shrimp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shrimp" ADD CONSTRAINT "Shrimp_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
