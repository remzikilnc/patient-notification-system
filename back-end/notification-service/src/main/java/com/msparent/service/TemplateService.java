package com.msparent.service;

import com.msparent.model.Template;
import com.msparent.repository.CriteriaRepository;
import com.msparent.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
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
        setTextMessageFromHtml(template);
        return templateRepository.save(template);
    }

    public Template createTemplate(Template template) {
        setTextMessageFromHtml(template);
        return templateRepository.save(template);
    }


    public void deleteTemplate(Template template) {
        templateRepository.delete(template);
    }

    private void setTextMessageFromHtml(Template template) {
        if (template.getTextMessage() == null || template.getTextMessage().isEmpty()) {
            if (template.getHtmlMessage() != null && !template.getHtmlMessage().isEmpty()) {
                String textMessage = Jsoup.parse(template.getHtmlMessage()).text();
                template.setTextMessage(textMessage);
            } else {
                template.setTextMessage(null);
            }
        }
    }

}
