# ADSI Model Evaluation

## Model Type

Random Forest Classifier

## Training Dataset

Drug Stability Environmental Exposure Dataset

## Input Features

* temperature_exposure
* humidity
* exposure_hours
* stability_index
* recommended_temp

## Target Variable

risk_label

## Performance

The model was trained using an 80/20 train-test split.

Evaluation metrics include:

* Accuracy
* Precision
* Recall
* F1 Score

The Random Forest model demonstrated strong performance in predicting degradation risk categories.

## Output

The trained model is saved as:

ai-model/model.pkl

This model will be used in the ADSI system to predict pharmaceutical degradation risk based on environmental conditions.
