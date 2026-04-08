# Drug Stability Environmental Exposure Dataset

## Dataset Name

**Drug Stability Environmental Exposure Dataset**

---

## Purpose

This dataset is designed to train machine learning models that predict **pharmaceutical degradation risk** based on environmental exposure conditions during transportation and storage.

The dataset supports the development of the **AI Drug Stability Intelligence System (ADSI)**, which monitors environmental factors and predicts the likelihood of drug degradation.

---

## Data Type

Synthetic dataset generated using **pharmaceutical stability guidelines** and **environmental exposure modeling**.

The dataset simulates realistic storage conditions commonly encountered in pharmaceutical supply chains, particularly in **tropical environments**.

---

## Features

| Feature | Description |
|------|------|
| **drug_name** | Name of the pharmaceutical product |
| **drug_class** | Pharmacological class of the drug (e.g., Antibiotic, Analgesic, Biologic) |
| **recommended_temp** | Recommended storage temperature for the drug (°C) |
| **temperature_exposure** | Actual environmental temperature to which the drug was exposed (°C) |
| **humidity** | Relative humidity level during exposure (%) |
| **exposure_hours** | Duration of exposure to the environmental condition (hours) |
| **stability_index** | Relative stability score representing the drug’s sensitivity to environmental stress |
| **risk_label** | Predicted degradation risk category |

### Risk Label Categories

- **Low**
- **Moderate**
- **High**

---

## Dataset Generation

The dataset is **synthetically generated** using a simulation model that incorporates:

- temperature variation
- humidity variation
- drug-specific stability characteristics
- exposure duration

A **dataset generator script** is provided in the repository to ensure **full reproducibility** of the dataset.

---

## Intended Use

The dataset is intended for:

- training machine learning models for **degradation risk prediction**
- testing **environmental monitoring algorithms**
- supporting research in **pharmaceutical supply chain stability**

---

## Repository Structure

The dataset is stored at:
