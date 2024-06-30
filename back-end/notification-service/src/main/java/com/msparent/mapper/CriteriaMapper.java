package com.msparent.mapper;

import com.msparent.dto.criteria.CriteriaRequest;
import com.msparent.dto.criteria.CriteriaResponse;
import com.msparent.model.Criteria;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CriteriaMapper implements Mapper<CriteriaRequest, Criteria, CriteriaResponse> {
    @Override
    public Criteria mapToEntity(Criteria criteria, CriteriaRequest request) {
        criteria.setMaxAge(request.getMaxAge());
        criteria.setMinAge(request.getMinAge());
        criteria.setGender(request.getGender());
        criteria.setNotificationTemplate(request.getNotificationTemplate());
        return criteria;
    }

    public CriteriaResponse mapToResponseWithTargets(Criteria criteria) {
        return CriteriaResponse.builder()
                .id(criteria.getId())
                .maxAge(criteria.getMaxAge())
                .minAge(criteria.getMinAge())
                .gender(criteria.getGender())
                .notificationTemplate(criteria.getNotificationTemplate())
                .targetPatients(criteria.getTargetPatients())
                .build();
    }

    @Override
    public CriteriaResponse mapToResponse(Criteria criteria) {
        return CriteriaResponse.builder()
                .id(criteria.getId())
                .maxAge(criteria.getMaxAge())
                .minAge(criteria.getMinAge())
                .gender(criteria.getGender())
                .notificationTemplate(criteria.getNotificationTemplate())
                .build();
    }

    @Override
    public List<CriteriaResponse> mapToResponse(List<Criteria> criterias) {
        return criterias.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}
