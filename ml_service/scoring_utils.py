"""Roommate compatibility and housing price preference scoring algorithms."""
import math
from typing import Mapping, Any


def compute_lifestyle_similarity(profile_a: Mapping[str, Any], profile_b: Mapping[str, Any]) -> float:
    """
    Computes normalized similarity [0.0, 1.0] between two user lifestyle profiles.
    Evaluates:
      - Cleanliness match (scale 1 to 5)
      - Noise tolerance match (scale 1 to 5)
      - Sleep schedule alignment (0=early bird, 1=flexible, 2=night owl)
      - Smoking compatibility (strict penalty if incompatible)
    """
    clean_diff = abs(profile_a.get("cleanliness", 3) - profile_b.get("cleanliness", 3)) / 4.0
    noise_diff = abs(profile_a.get("noise_tolerance", 3) - profile_b.get("noise_tolerance", 3)) / 4.0
    sleep_diff = abs(profile_a.get("sleep_schedule", 1) - profile_b.get("sleep_schedule", 1)) / 2.0

    raw_dist = (clean_diff * 0.4) + (noise_diff * 0.3) + (sleep_diff * 0.3)
    similarity = max(0.0, min(1.0, 1.0 - raw_dist))

    # Smoking constraint
    smoke_a = bool(profile_a.get("smoking", False))
    smoke_b = bool(profile_b.get("smoking", False))
    if smoke_a != smoke_b:
        similarity *= 0.7  # 30% reduction if smoking habits diverge

    return round(similarity, 4)


def compute_budget_compatibility(
    min_a: float, max_a: float, min_b: float, max_b: float
) -> float:
    """
    Computes budget overlap ratio [0.0, 1.0] between two roommates' rental budgets.
    """
    if max_a < min_a or max_b < min_b:
        raise ValueError("Maximum budget cannot be less than minimum budget")

    overlap_start = max(min_a, min_b)
    overlap_end = min(max_a, max_b)

    if overlap_end < overlap_start:
        return 0.0  # No budget intersection

    overlap_span = overlap_end - overlap_start
    union_span = max(max_a, max_b) - min(min_a, min_b)

    if union_span == 0:
        return 1.0

    return round(overlap_span / union_span, 4)


def compute_overall_match(
    profile_a: Mapping[str, Any],
    profile_b: Mapping[str, Any],
    budget_weight: float = 0.4,
) -> float:
    """
    Combines lifestyle similarity and budget overlap into an aggregate match score.
    """
    lifestyle_score = compute_lifestyle_similarity(profile_a, profile_b)
    budget_score = compute_budget_compatibility(
        profile_a.get("min_budget", 5000),
        profile_a.get("max_budget", 15000),
        profile_b.get("min_budget", 5000),
        profile_b.get("max_budget", 15000),
    )
    lifestyle_weight = 1.0 - budget_weight
    overall = (lifestyle_score * lifestyle_weight) + (budget_score * budget_weight)
    return round(max(0.0, min(1.0, overall)), 4)
