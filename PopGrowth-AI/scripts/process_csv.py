import sys
import pandas as pd
import numpy as np
from scipy.optimize import curve_fit
import json

def exponential_growth(t, P0, r):
    return P0 * np.exp(r * t)

def logistic_growth(t, K, r, P0):
    return K / (1 + (K/P0 - 1) * np.exp(-r * t))

def process_csv(file_path):
    df = pd.read_csv(file_path)
    
    time = df['Year'].values - df['Year'].min()
    population = df['Population'].values
    
    # Exponential growth
    popt_exp, _ = curve_fit(exponential_growth, time, population, p0=[population[0], 0.1])
    P0_exp, r_exp = popt_exp
    
    future_time = np.arange(0, time.max() + 50)
    future_population_exp = exponential_growth(future_time, P0_exp, r_exp)
    
    data_exp = [{"time": int(t), "population": int(p)} for t, p in zip(future_time, future_population_exp)]
    
    prediction_years = 50
    prediction_exp = exponential_growth(time.max() + prediction_years, P0_exp, r_exp)
    
    # Logistic growth
    popt_log, _ = curve_fit(logistic_growth, time, population, p0=[population.max(), 0.1, population[0]])
    
    K, r_log, P0_log = popt_log
    
    future_population_log = logistic_growth(future_time, K, r_log, P0_log)
    
    data_log = [{"time": int(t), "population": int(p)} for t, p in zip(future_time, future_population_log)]
    
    prediction_log = logistic_growth(time.max() + prediction_years, K, r_log, P0_log)
    
    result = {
        "exponential": {
            "data": data_exp,
            "prediction_years": prediction_years,
            "prediction": prediction_exp
        },
        "logistic": {
            "data": data_log,
            "prediction_years": prediction_years,
            "prediction": prediction_log
        }
    }
    
    print(json.dumps(result))

if __name__ == "__main__":
    file_path = sys.argv[1]
    process_csv(file_path)

