-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "classType" TEXT NOT NULL DEFAULT 'ADULT_BJJ',
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "academyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Class_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Class_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("academyId", "createdAt", "dayOfWeek", "description", "endTime", "id", "instructorId", "name", "startTime", "updatedAt") SELECT "academyId", "createdAt", "dayOfWeek", "description", "endTime", "id", "instructorId", "name", "startTime", "updatedAt" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE INDEX "Class_academyId_idx" ON "Class"("academyId");
CREATE INDEX "Class_instructorId_idx" ON "Class"("instructorId");
CREATE UNIQUE INDEX "Class_academyId_dayOfWeek_startTime_key" ON "Class"("academyId", "dayOfWeek", "startTime");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
