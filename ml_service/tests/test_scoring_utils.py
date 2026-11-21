import pytest
from scoring_utils import (
    compute_lifestyle_similarity,
    compute_budget_compatibility,
    compute_overall_match,
)


def test_lifestyle_similarity_identical():
    profile = {
        "cleanliness": 4,
        "noise_tolerance": 3,
        "sleep_schedule": 1,
        "smoking": False,
    }
    score = compute_lifestyle_similarity(profile, profile)
    assert score == 1.0


def test_lifestyle_similarity_divergent():
    profile_a = {"cleanliness": 1, "noise_tolerance": 5, "sleep_schedule": 0, "smoking": False}
    profile_b = {"cleanliness": 5, "noise_tolerance": 1, "sleep_schedule": 2, "smoking": True}
    score = compute_lifestyle_similarity(profile_a, profile_b)
    assert score < 0.35  # Extreme divergence plus smoking penalty


def test_budget_compatibility_full_overlap():
    score = compute_budget_compatibility(8000, 12000, 8000, 12000)
    assert score == 1.0


def test_budget_compatibility_partial_overlap():
    score = compute_budget_compatibility(5000, 10000, 8000, 15000)
    # Overlap span: 10000 - 8000 = 2000. Union span: 15000 - 5000 = 10000. Ratio = 0.2
    assert score == 0.2


def test_budget_compatibility_no_overlap():
    score = compute_budget_compatibility(5000, 8000, 10000, 15000)
    assert score == 0.0


def test_budget_compatibility_invalid_bounds():
    with pytest.raises(ValueError, match="cannot be less"):
        compute_budget_compatibility(10000, 5000, 8000, 12000)


def test_overall_match_bounds():
    prof_a = {"cleanliness": 3, "min_budget": 6000, "max_budget": 12000}
    prof_b = {"cleanliness": 4, "min_budget": 7000, "max_budget": 11000}
    match_score = compute_overall_match(prof_a, prof_b)
    assert 0.0 <= match_score <= 1.0
