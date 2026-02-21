-- CreateIndex
CREATE INDEX "task_projectId_idx" ON "task"("projectId");

-- CreateIndex
CREATE INDEX "task_assignedToDashboardUserId_idx" ON "task"("assignedToDashboardUserId");

-- CreateIndex
CREATE INDEX "task_status_idx" ON "task"("status");
