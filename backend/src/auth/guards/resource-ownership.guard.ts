import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResourceServiceResolver } from '../../resource/resource-service-resolver.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly resourceServiceResolver: ResourceServiceResolver,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const resourceName = this.reflector.get<string>(
      'resourceName',
      context.getHandler(),
    );
    const resourceService = this.resourceServiceResolver.resolve(resourceName);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;
    let targetResourceId = -1;
    if (resourceName === 'todo') targetResourceId = parseInt(params.user, 10);
    else if (resourceName === 'user')
      targetResourceId = parseInt(params.id, 10);
    return resourceService.isOwner(user, targetResourceId, resourceName);
  }
}
