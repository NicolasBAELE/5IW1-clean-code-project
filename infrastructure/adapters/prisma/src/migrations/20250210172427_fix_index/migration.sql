-- CreateIndex
CREATE INDEX "Driver_userId_idx" ON "Driver"("userId");

-- CreateIndex
CREATE INDEX "IncidentHistory_driverId_idx" ON "IncidentHistory"("driverId");

-- CreateIndex
CREATE INDEX "IncidentHistory_motoId_idx" ON "IncidentHistory"("motoId");

-- CreateIndex
CREATE INDEX "Maintenance_motoId_idx" ON "Maintenance"("motoId");

-- CreateIndex
CREATE INDEX "MotoTest_driverId_idx" ON "MotoTest"("driverId");

-- CreateIndex
CREATE INDEX "MotoTest_motoId_idx" ON "MotoTest"("motoId");
