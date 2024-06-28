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
        template.setHtml_message(request.getHtml_message());
        template.setTitle(request.getTitle());
        template.setNotificationTypes(request.getNotificationTypes());
        return template;
    }
    @Override
    public TemplateResponse mapToResponse(Template template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .html_message(template.getHtml_message())
                .text_message(template.getText_message())
                .title(template.getTitle())
                .notificationTypes(template.getNotificationTypes())
                .build();
    }

    public TemplateResponse mapToResponseWithCriteria(Template template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .html_message(template.getHtml_message())
                .text_message(template.getText_message())
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
