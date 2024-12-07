import sys
import scipy.io
import numpy as np
from scipy.optimize import curve_fit
import json

def logistic_growth(t, K, r, P0):
    return K / (1 + (K/P0 - 1) * np.exp(-r * t))

def process_matlab(file_path):
    mat_data = scipy.io.loadmat(file_path)
    
    time = mat_data['time'].flatten()
    population = mat_data['population'].flatten()
    
    popt, _ = curve_fit(logistic_growth, time, population, p0=[population.max(), 0.1, population[0]])
    
    K, r, P0 = popt
    
    future_time = np.arange(0, time.max() + 50)
    future_population = logistic_growth(future_time, K, r, P0)
    
    data = [{"time": int(t), "population": int(p)} for t, p in zip(future_time, future_population)]
    
    prediction_years = 50
    prediction = logistic_growth(time.max() + prediction_years, K, r, P0)
    
    result = {
        "data": data,
        "prediction_years": prediction_years,
        "prediction": prediction
    }
    
    print(json.dumps(result))

if __name__ == "__main__":
    file_path = sys.argv[1]
    process_matlab(file_path)

