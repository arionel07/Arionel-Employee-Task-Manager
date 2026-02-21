-- CreateIndex
CREATE INDEX "dashboard_user_projectId_idx" ON "dashboard_user"("projectId");

-- CreateIndex
CREATE INDEX "dashboard_user_userId_idx" ON "dashboard_user"("userId");

-- CreateIndex
CREATE INDEX "project_managerId_idx" ON "project"("managerId");
