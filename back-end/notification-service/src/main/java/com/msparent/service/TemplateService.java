package com.msparent.service;

import com.msparent.model.Template;
import com.msparent.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;


    public List<Template> getTemplates() {
        return templateRepository.findAll();
    }

    public Template getTemplate(Long id) {
        return templateRepository.findById(id).orElse(null);
    }

    public Template updateTemplate(Template template) {
        return templateRepository.save(template);
    }

    public Template createTemplate(Template template) {
        return templateRepository.save(template);
    }

    public void deleteTemplate(Template template) {
        templateRepository.delete(template);
    }

}
