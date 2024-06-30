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
    @ResponseStatus(HttpStatus.OK)
    public List<TemplateResponse> index() {
        List<Template> templates = templateService.getTemplates();
        return templateMapper.mapToResponse(templates);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TemplateResponse show(@PathVariable Long id, @RequestParam(value = "criterias", required = false, defaultValue = "false") boolean criterias) {
        Template template = templateService.getTemplate(id);

        if (template == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        if (criterias) return templateMapper.mapToResponseWithCriteria(template);

        return templateMapper.mapToResponse(template);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TemplateResponse store(@Valid @RequestBody TemplateRequest templateRequest) {
        Template template = templateMapper.mapToEntity(new Template(), templateRequest);
        Template savedTemplate = templateService.createTemplate(template);
        return templateMapper.mapToResponse(savedTemplate);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TemplateResponse update(@Valid @PathVariable Long id, @RequestBody TemplateRequest templateRequest) {
        Template template = templateService.getTemplate(id);

        if (template == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        template = templateMapper.mapToEntity(template, templateRequest);
        Template updatedTemplate = templateService.updateTemplate(template);

        return templateMapper.mapToResponse(updatedTemplate);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        Template template = templateService.getTemplate(id);

        if (template == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        templateService.deleteTemplate(template);
    }
}
