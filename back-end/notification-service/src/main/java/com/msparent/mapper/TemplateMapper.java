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
        template.setMessage(request.getMessage());
        return template;
    }
    @Override
    public TemplateResponse mapToResponse(Template template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .message(template.getMessage())
                .criteria(template.getCriteria())
                .build();
    }

    @Override
    public List<TemplateResponse> mapToResponse(List<Template> templates) {
        return templates.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}