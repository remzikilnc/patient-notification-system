package com.msparent.controller;

import com.msparent.dto.criteria.CriteriaRequest;
import com.msparent.dto.criteria.CriteriaResponse;
import com.msparent.mapper.CriteriaMapper;
import com.msparent.model.Criteria;
import com.msparent.service.CriteriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/v1/notifications/criterias")
@RequiredArgsConstructor
public class CriteriaController {

    private final CriteriaService criteriaService;
    private final CriteriaMapper criteriaMapper;


    @GetMapping
    public List<CriteriaResponse> index() {
        List<Criteria> criterias = criteriaService.getAllCriteria();
        return criteriaMapper.mapToResponse(criterias);
    }


    @GetMapping("/{id}")
    public CriteriaResponse show(@PathVariable Long id) {
        Criteria criteria = criteriaService.getCriteria(id);

        if (criteria == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found");
        }

        return criteriaMapper.mapToResponse(criteria);
    }

    @PostMapping
    public CriteriaResponse create(@Valid @RequestBody CriteriaRequest criteriaRequest) {
        Criteria template = criteriaMapper.mapToEntity(new Criteria(), criteriaRequest);
        Criteria savedCriteria = criteriaService.createCriteria(template);
        return criteriaMapper.mapToResponse(savedCriteria);
    }

    @PutMapping("/{id}")
    public CriteriaResponse update(@PathVariable Long id, @RequestBody Criteria criteria) {
        Criteria existingCriteria = criteriaService.getCriteria(id);

        if (existingCriteria == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Criteria not found");
        }

        Criteria updatedCriteria = criteriaService.updateCriteria(criteria);
        return criteriaMapper.mapToResponse(updatedCriteria);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Criteria template = criteriaService.getCriteria(id);

        if (template == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Criteria not found");
        }

        criteriaService.deleteCriteria(template);
    }
}