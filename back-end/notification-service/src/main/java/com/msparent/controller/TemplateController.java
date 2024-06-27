package com.msparent.controller;

import com.msparent.dto.template.TemplateRequest;
import com.msparent.dto.template.TemplateResponse;
import com.msparent.mapper.TemplateMapper;
import com.msparent.model.Template;
import com.msparent.service.TemplateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/v1/notifications/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;
    private final TemplateMapper templateMapper;

    @GetMapping
    public List<TemplateResponse> index() {
        List<Template> templates = templateService.getTemplates();
        return templateMapper.mapToResponse(templates);
    }

    @GetMapping("/{id}")
    public TemplateResponse show(@PathVariable Long id) {
        Template template = templateService.getTemplate(id);

        if (template == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        return templateMapper.mapToResponse(template);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TemplateResponse store( @RequestBody TemplateRequest templateRequest) {
        Template template = templateMapper.mapToEntity(new Template(), templateRequest);
        Template savedTemplate = templateService.createTemplate(template);
        return templateMapper.mapToResponse(savedTemplate);
    }

    @PutMapping("/{id}")
    public TemplateResponse update(@PathVariable Long id, @RequestBody Template template) {
        Template existingTemplate = templateService.getTemplate(id);

        if (existingTemplate == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        template.setId(id);
        Template updatedTemplate = templateService.updateTemplate(template);
        return templateMapper.mapToResponse(updatedTemplate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Template template = templateService.getTemplate(id);

        if (template == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        templateService.deleteTemplate(template);
    }
}
