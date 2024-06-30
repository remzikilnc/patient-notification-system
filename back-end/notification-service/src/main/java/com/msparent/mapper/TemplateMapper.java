package com.msparent.mapper;

import com.msparent.dto.template.TemplateRequest;
import com.msparent.dto.template.TemplateResponse;
import com.msparent.model.Template;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TemplateMapper implements Mapper<TemplateRequest, Template, TemplateResponse> {
    @Override
    public Template mapToEntity(Template template, TemplateRequest request) {
        template.setHtmlMessage(request.getHtmlMessage());
        template.setTextMessage(request.getTextMessage());
        template.setTitle(request.getTitle());
        template.setNotificationTypes(request.getNotificationTypes());
        return template;
    }
    @Override
    public TemplateResponse mapToResponse(Template template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .htmlMessage(template.getHtmlMessage())
                .textMessage(template.getTextMessage())
                .title(template.getTitle())
                .notificationTypes(template.getNotificationTypes())
                .build();
    }

    public TemplateResponse mapToResponseWithCriteria(Template template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .htmlMessage(template.getHtmlMessage())
                .textMessage(template.getTextMessage())
                .title(template.getTitle())
                .criterias(template.getCriterias())
                .notificationTypes(template.getNotificationTypes())
                .build();

    }

    @Override
    public List<TemplateResponse> mapToResponse(List<Template> templates) {
        return templates.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}
