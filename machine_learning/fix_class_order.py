import numpy as np

# Urutan kelas saat ini di aplikasi
CURRENT_CLASS_NAMES = ['No DR', 'Mild', 'Moderate', 'Severe', 'Proliferative DR']

# Hasil pengujian
test_results = {
    'Normal': {  # Seharusnya No DR (0)
        'predicted': 'Moderate',  # Indeks 2
        'raw_predictions': [4.6588018e-05, 1.3819596e-05, 9.9982893e-01, 3.2058033e-05, 7.8531521e-05]
    },
    'Ringan': {  # Seharusnya Mild (1)
        'predicted': 'No DR',  # Indeks 0
        'raw_predictions': [9.9918193e-01, 3.6737768e-04, 2.1408898e-04, 2.2252690e-04, 1.4099883e-05]
    },
    'Sedang': {  # Seharusnya Moderate (2)
        'predicted': 'Mild',  # Indeks 1
        'raw_predictions': [1.0508508e-03, 9.9841166e-01, 1.1756010e-04, 3.7827657e-04, 4.1668482e-05]
    },
    'Parah': {  # Seharusnya Severe (3)
        'predicted': 'Proliferative DR',  # Indeks 4
        'raw_predictions': [3.0159520e-04, 3.2097523e-03, 8.6925377e-04, 1.4724390e-04, 9.9547219e-01]
    },
    'Sangat Parah': {  # Seharusnya Proliferative DR (4)
        'predicted': 'Severe',  # Indeks 3
        'raw_predictions': [3.8591385e-05, 8.8907465e-05, 2.8152479e-05, 9.9974126e-01, 1.0308872e-04]
    }
}

# Mapping yang diharapkan
expected_mapping = {
    'Normal': 'No DR',  # 0
    'Ringan': 'Mild',   # 1
    'Sedang': 'Moderate',  # 2
    'Parah': 'Severe',  # 3
    'Sangat Parah': 'Proliferative DR'  # 4
}

# Analisis hasil untuk menentukan urutan kelas yang benar
print("Analisis Urutan Kelas:")
print("=" * 50)

# Berdasarkan indeks nilai tertinggi dalam prediksi
for label, result in test_results.items():
    raw_preds = np.array(result['raw_predictions'])
    predicted_idx = np.argmax(raw_preds)
    expected_class = expected_mapping[label]
    expected_idx = CURRENT_CLASS_NAMES.index(expected_class)
    
    print(f"{label:12} -> Prediksi: {CURRENT_CLASS_NAMES[predicted_idx]:15} (Indeks {predicted_idx})")
    print(f"{' ':12}    Diharapkan: {expected_class:15} (Indeks {expected_idx})")
    print(f"{' ':12}    Raw predictions: {raw_preds}")
    print("-" * 50)

# Berdasarkan analisis, kita dapat menentukan urutan kelas yang benar
# Mapping dari indeks prediksi ke indeks yang diharapkan
idx_mapping = {
    0: 1,  # No DR -> Mild
    1: 2,  # Mild -> Moderate
    2: 0,  # Moderate -> No DR
    3: 4,  # Severe -> Proliferative DR
    4: 3   # Proliferative DR -> Severe
}

# Urutan kelas yang benar
corrected_class_names = [None] * 5
for current_idx, correct_idx in idx_mapping.items():
    corrected_class_names[current_idx] = CURRENT_CLASS_NAMES[correct_idx]

print("\nUrutan Kelas yang Benar:")
print("=" * 50)
print(f"CURRENT_CLASS_NAMES = {CURRENT_CLASS_NAMES}")
print(f"CORRECTED_CLASS_NAMES = {corrected_class_names}")
print("=" * 50)

# Verifikasi dengan hasil pengujian
print("\nVerifikasi dengan Hasil Pengujian:")
print("=" * 50)
for label, result in test_results.items():
    raw_preds = np.array(result['raw_predictions'])
    predicted_idx = np.argmax(raw_preds)
    corrected_class = corrected_class_names[predicted_idx]
    expected_class = expected_mapping[label]
    
    match = "✓" if corrected_class == expected_class else "✗"
    print(f"{label:12} -> Prediksi dengan kelas yang dikoreksi: {corrected_class:15} | Diharapkan: {expected_class:15} | {match}")
print("=" * 50) 