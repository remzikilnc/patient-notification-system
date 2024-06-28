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
    private final CriteriaRepository criteriaRepository;


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
        criteriaRepository.deleteAll(template.getCriterias());
        templateRepository.delete(template);
    }

    private void setTextMessageFromHtml(Template template) {
        if (template.getText_message() == null || template.getText_message().isEmpty()) {
            if (template.getHtml_message() != null && !template.getHtml_message().isEmpty()) {
                String textMessage = Jsoup.parse(template.getHtml_message()).text();
                template.setText_message(textMessage);
            } else {
                template.setText_message(null);
            }
        }
    }

}
