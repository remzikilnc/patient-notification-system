package com.msparent.mapper;

import java.util.List;

public interface Mapper<Request, Entity, Response> {
    Entity mapToEntity(Entity entity, Request request);

    Response mapToResponse(Entity entity);

    List<Response> mapToResponse(List<Entity> entities);
}