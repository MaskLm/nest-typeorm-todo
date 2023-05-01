/*
// resource-ownership.guard.decorator.ts
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ResourceOwnershipGuard } from './resource-ownership.guard';

export function ResourceOwnership(resourceName: string) {
  return applyDecorators(
    SetMetadata('resourceName', resourceName),
    UseGuards(ResourceOwnershipGuard),
  );
}
*/
