document.addEventListener('DOMContentLoaded', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZGMzYmEwNjc0Yzg0NTQ4YTQxNTc4ZDY2ZjBmNjRmYiIsImlhdCI6MTcyMDY5OTU2MSwiZXhwIjoyMDM2MDU5NTYxfQ.4vMNKmoj7-5XD2UcOZ6v52_FXwne1HYJzvBZvAOJkM8';
    const wsUrl = 'wss://kukzjhumsnjlw8xzts2cke6uwbbfy8bi.ui.nabu.casa/api/websocket';

    const pritochkiButton = document.querySelector('button[data-toggle="#pritochki"]');
    const vityajkiButton = document.querySelector('button[data-toggle="#vityajki"]');
    const buttonsMenuCardP = document.getElementById('buttons-menu-card-p');
    const buttonsMenuCardV = document.getElementById('buttons-menu-card-v');
    const displayMenuMain = document.getElementById('display-menu-main');
    const buttons = document.querySelectorAll('.buttons-menu-card-buttons');

    const sliders = document.querySelectorAll('.slider');
    const sensorStates = {};
    const sensors = [
        { id: 'sensor.p06_temperatura_naruzhnego_vozdukha', elementIds: ['outdoor-temp', 'p06_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p10_temperatura_pritoka_vody', elementIds: ['heat-carrier-temperature', 'p01_temperatura_pritoka_vody_diw', 'p02_temperatura_pritoka_vody_diw', 'p03_temperatura_pritoka_vody_diw', 'p04_temperatura_pritoka_vody_diw', 'p05_temperatura_pritoka_vody_diw', 'p06_temperatura_pritoka_vody_diw', 'p07_temperatura_pritoka_vody_diw', 'p08_temperatura_pritoka_vody_diw', 'p10_temperatura_pritoka_vody_diw', 'p11_temperatura_pritoka_vody_diw'], unit: 'C' },

        { id: 'sensor.p01_workmode_status', elementIds: ['p01_mode', 'p01_workmode_status_diw'], unit: '' },
        { id: 'sensor.p01_actualtemp', elementIds: ['p01_actual_temp', 'p01_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p01_ustavka_speedfan', elementIds: ['p01_ustavka_fan', 'p01_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p01_temperatura_v_kanale', elementIds: ['p01_temperatura_v_kanale', 'p01_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p01_chastota', elementIds: ['p01_chastota', 'p01_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p01_temperatura_naruzhnego_vozdukha', elementIds: ['p01_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p01_temperatura_obratnoi_vody', elementIds: ['p01_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p01_voltazh', elementIds: ['p01_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p01_moshchnost', elementIds: ['p01_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p01_skorost', elementIds: ['p01_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p01_sila_toka', elementIds: ['p01_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p01_okhlazhdenie', elementIds: ['p01_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p01_nagrev', elementIds: ['p01_nagrev_diw'], unit: '%' },
        { id: 'sensor.p01_error_status', elementIds: ['p01_error_status_diw'], unit: '' },
        { id: 'sensor.p01_narabotka_fansupply', elementIds: ['p01_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p02_workmode_status', elementIds: ['p02_mode', 'p02_workmode_status_diw'], unit: '' },
        { id: 'sensor.p02_actualtemp', elementIds: ['p02_actual_temp', 'p02_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p02_ustavka_speedfan', elementIds: ['p02_ustavka_fan', 'p02_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p02_temperatura_v_kanale', elementIds: ['p02_temperatura_v_kanale', 'p02_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p02_chastota', elementIds: ['p02_chastota', 'p02_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p02_temperatura_naruzhnego_vozdukha', elementIds: ['p02_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p02_temperatura_obratnoi_vody', elementIds: ['p02_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p02_voltazh', elementIds: ['p02_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p02_moshchnost', elementIds: ['p02_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p02_skorost', elementIds: ['p02_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p02_sila_toka', elementIds: ['p02_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p02_okhlazhdenie', elementIds: ['p02_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p02_nagrev', elementIds: ['p02_nagrev_diw'], unit: '%' },
        { id: 'sensor.p02_error_status', elementIds: ['p02_error_status_diw'], unit: '' },
        { id: 'sensor.p02_narabotka_fansupply', elementIds: ['p02_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p03_workmode_status', elementIds: ['p03_mode', 'p03_workmode_status_diw'], unit: '' },
        { id: 'sensor.p03_actualtemp', elementIds: ['p03_actual_temp', 'p03_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p03_ustavka_speedfan', elementIds: ['p03_ustavka_fan', 'p03_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p03_temperatura_v_kanale', elementIds: ['p03_temperatura_v_kanale', 'p03_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p03_chastota', elementIds: ['p03_chastota', 'p03_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p03_temperatura_naruzhnego_vozdukha', elementIds: ['p03_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p03_temperatura_obratnoi_vody', elementIds: ['p03_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p03_voltazh', elementIds: ['p03_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p03_moshchnost', elementIds: ['p03_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p03_skorost', elementIds: ['p03_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p03_sila_toka', elementIds: ['p03_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p03_okhlazhdenie', elementIds: ['p03_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p03_nagrev', elementIds: ['p03_nagrev_diw'], unit: '%' },
        { id: 'sensor.p03_error_status', elementIds: ['p03_error_status_diw'], unit: '' },
        { id: 'sensor.p03_narabotka_fansupply', elementIds: ['p03_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p04_workmode_status', elementIds: ['p04_mode', 'p04_workmode_status_diw'], unit: '' },
        { id: 'sensor.p04_actualtemp', elementIds: ['p04_actual_temp', 'p04_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p04_ustavka_speedfan', elementIds: ['p04_ustavka_fan', 'p04_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p04_temperatura_v_kanale', elementIds: ['p04_temperatura_v_kanale', 'p04_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p04_chastota', elementIds: ['p04_chastota', 'p04_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p04_temperatura_naruzhnego_vozdukha', elementIds: ['p04_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p04_temperatura_obratnoi_vody', elementIds: ['p04_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p04_voltazh', elementIds: ['p04_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p04_moshchnost', elementIds: ['p04_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p04_skorost', elementIds: ['p04_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p04_sila_toka', elementIds: ['p04_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p04_okhlazhdenie', elementIds: ['p04_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p04_nagrev', elementIds: ['p04_nagrev_diw'], unit: '%' },
        { id: 'sensor.p04_error_status', elementIds: ['p04_error_status_diw'], unit: '' },
        { id: 'sensor.p04_narabotka_fansupply', elementIds: ['p04_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p05_workmode_status', elementIds: ['p05_mode', 'p05_workmode_status_diw'], unit: '' },
        { id: 'sensor.p05_actualtemp', elementIds: ['p05_actual_temp', 'p05_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p05_ustavka_speedfan', elementIds: ['p05_ustavka_fan', 'p05_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p05_temperatura_v_kanale', elementIds: ['p05_temperatura_v_kanale', 'p05_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p05_chastota', elementIds: ['p05_chastota', 'p05_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p05_temperatura_naruzhnego_vozdukha', elementIds: ['p05_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p05_temperatura_obratnoi_vody', elementIds: ['p05_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p05_voltazh', elementIds: ['p05_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p05_moshchnost', elementIds: ['p05_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p05_skorost', elementIds: ['p05_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p05_sila_toka', elementIds: ['p05_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p05_okhlazhdenie', elementIds: ['p05_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p05_nagrev', elementIds: ['p05_nagrev_diw'], unit: '%' },
        { id: 'sensor.p05_error_status', elementIds: ['p05_error_status_diw'], unit: '' },
        { id: 'sensor.p05_narabotka_fansupply', elementIds: ['p05_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p06_workmode_status', elementIds: ['p06_mode', 'p06_workmode_status_diw'], unit: '' },
        { id: 'sensor.p06_actualtemp', elementIds: ['p06_actual_temp', 'p06_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p06_ustavka_speedfan', elementIds: ['p06_ustavka_fan', 'p06_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p06_temperatura_v_kanale', elementIds: ['p06_temperatura_v_kanale', 'p06_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p06_chastota', elementIds: ['p06_chastota', 'p06_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p06_temperatura_obratnoi_vody', elementIds: ['p06_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p06_voltazh', elementIds: ['p06_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p06_moshchnost', elementIds: ['p06_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p06_skorost', elementIds: ['p06_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p06_sila_toka', elementIds: ['p06_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p06_okhlazhdenie', elementIds: ['p06_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p06_nagrev', elementIds: ['p06_nagrev_diw'], unit: '%' },
        { id: 'sensor.p06_error_status', elementIds: ['p06_error_status_diw'], unit: '' },
        { id: 'sensor.p06_narabotka_fansupply', elementIds: ['p06_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p07_workmode_status', elementIds: ['p07_mode', 'p07_workmode_status_diw'], unit: '' },
        { id: 'sensor.p07_actualtemp', elementIds: ['p07_actual_temp', 'p07_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p07_ustavka_speedfan', elementIds: ['p07_ustavka_fan', 'p07_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p07_temperatura_v_kanale', elementIds: ['p07_temperatura_v_kanale', 'p07_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p07_chastota', elementIds: ['p07_chastota', 'p07_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p07_temperatura_naruzhnego_vozdukha', elementIds: ['p07_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p07_temperatura_obratnoi_vody', elementIds: ['p07_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p07_voltazh', elementIds: ['p07_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p07_moshchnost', elementIds: ['p07_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p07_skorost', elementIds: ['p07_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p07_sila_toka', elementIds: ['p07_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p07_okhlazhdenie', elementIds: ['p07_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p07_nagrev', elementIds: ['p07_nagrev_diw'], unit: '%' },
        { id: 'sensor.p07_error_status', elementIds: ['p07_error_status_diw'], unit: '' },
        { id: 'sensor.p07_narabotka_fansupply', elementIds: ['p07_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p08_workmode_status', elementIds: ['p08_mode', 'p08_workmode_status_diw'], unit: '' },
        { id: 'sensor.p08_actualtemp', elementIds: ['p08_actual_temp', 'p08_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p08_ustavka_speedfan', elementIds: ['p08_ustavka_fan', 'p08_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p08_temperatura_v_kanale', elementIds: ['p08_temperatura_v_kanale', 'p08_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p08_chastota', elementIds: ['p08_chastota', 'p08_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p08_temperatura_naruzhnego_vozdukha', elementIds: ['p08_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p08_temperatura_obratnoi_vody', elementIds: ['p08_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p08_voltazh', elementIds: ['p08_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p08_moshchnost', elementIds: ['p08_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p08_skorost', elementIds: ['p08_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p08_sila_toka', elementIds: ['p08_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p08_okhlazhdenie', elementIds: ['p08_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p08_nagrev', elementIds: ['p08_nagrev_diw'], unit: '%' },
        { id: 'sensor.p08_error_status', elementIds: ['p08_error_status_diw'], unit: '' },
        { id: 'sensor.p08_narabotka_fansupply', elementIds: ['p08_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p10_workmode_status', elementIds: ['p10_mode', 'p10_workmode_status_diw'], unit: '' },
        { id: 'sensor.p10_actualtemp', elementIds: ['p10_actual_temp', 'p10_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p10_ustavka_speedfan', elementIds: ['p10_ustavka_fan', 'p10_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p10_temperatura_v_kanale', elementIds: ['p10_temperatura_v_kanale', 'p10_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p10_chastota', elementIds: ['p10_chastota', 'p10_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p10_temperatura_naruzhnego_vozdukha', elementIds: ['p10_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p10_temperatura_obratnoi_vody', elementIds: ['p10_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p10_voltazh', elementIds: ['p10_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p10_moshchnost', elementIds: ['p10_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p10_skorost', elementIds: ['p10_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p10_sila_toka', elementIds: ['p10_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p10_okhlazhdenie', elementIds: ['p10_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p10_nagrev', elementIds: ['p10_nagrev_diw'], unit: '%' },
        { id: 'sensor.p10_error_status', elementIds: ['p10_error_status_diw'], unit: '' },
        { id: 'sensor.p10_narabotka_fansupply', elementIds: ['p10_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.p11_workmode_status', elementIds: ['p11_mode', 'p11_workmode_status_diw'], unit: '' },
        { id: 'sensor.p11_actualtemp', elementIds: ['p11_actual_temp', 'p11_actualtemp_diw'], unit: 'C' },
        { id: 'sensor.p11_ustavka_speedfan', elementIds: ['p11_ustavka_fan', 'p11_ustavka_speedfan_diw'], unit: '%' },
        { id: 'sensor.p11_temperatura_v_kanale', elementIds: ['p11_temperatura_v_kanale', 'p11_temperatura_v_kanale_diw'], unit: 'C' },
        { id: 'sensor.p11_chastota', elementIds: ['p11_chastota', 'p11_chastota_diw'], unit: 'Hz' },
        { id: 'sensor.p11_temperatura_naruzhnego_vozdukha', elementIds: ['p11_temperatura_naruzhnego_vozdukha_diw'], unit: 'C' },
        { id: 'sensor.p11_temperatura_obratnoi_vody', elementIds: ['p11_temperatura_obratnoi_vody_diw'], unit: 'C' },
        { id: 'sensor.p11_voltazh', elementIds: ['p11_voltazh_diw'], unit: 'V' },
        { id: 'sensor.p11_moshchnost', elementIds: ['p11_moshchnost_diw'], unit: 'W' },
        { id: 'sensor.p11_skorost', elementIds: ['p11_skorost_diw'], unit: 'rpm' },
        { id: 'sensor.p11_sila_toka', elementIds: ['p11_sila_toka_diw'], unit: 'A' },
        { id: 'sensor.p11_okhlazhdenie', elementIds: ['p11_okhlazhdenie_diw'], unit: '%' },
        { id: 'sensor.p11_nagrev', elementIds: ['p11_nagrev_diw'], unit: '%' },
        { id: 'sensor.p11_error_status', elementIds: ['p11_error_status_diw'], unit: '' },
        { id: 'sensor.p11_narabotka_fansupply', elementIds: ['p11_narabotka_fansupply_diw'], unit: 'H' },

        { id: 'sensor.v01_motor_current', elementIds: ['v01_current', 'v01_current_diw'], unit: 'A' },
        { id: 'sensor.v01_frequencyhz', elementIds: ['v01_freq', 'v01_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v01_alarmsword', elementIds: ['v01_alarmsword', 'V01_alarmsword_diw'], unit: '' },
        { id: 'sensor.v01_coil_mode', elementIds: ['v01_coil_mode'], unit: '' },
        { id: 'sensor.v01_status_buscontrol', elementIds: ['v01_status_buscontrol'], unit: '' },
        { id: 'sensor.v01_status_running', elementIds: ['v01_status_running'], unit: '' },
        { id: 'sensor.v01_warnings_word', elementIds: ['v01_warnings_word'], unit: '' },
        { id: 'sensor.v01_status_voltageexceeded', elementIds: ['v01_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v01_status_warning', elementIds: ['v01_status_warning'], unit: '' },
        { id: 'sensor.v01_status_thermalwarning', elementIds: ['v01_status_thermalwarning'], unit: '' },

        { id: 'sensor.v02_motor_current', elementIds: ['v02_current', 'v02_current_diw'], unit: 'A' },
        { id: 'sensor.v02_frequencyhz', elementIds: ['v02_freq', 'v02_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v02_alarmsword', elementIds: ['v02_alarmsword', 'v02_alarmsword_diw'], unit: '' },
        { id: 'sensor.v02_coil_mode', elementIds: ['v02_coil_mode'], unit: '' },
        { id: 'sensor.v02_status_buscontrol', elementIds: ['v02_status_buscontrol'], unit: '' },
        { id: 'sensor.v02_status_running', elementIds: ['v02_status_running'], unit: '' },
        { id: 'sensor.v02_warnings_word', elementIds: ['v02_warnings_word'], unit: '' },
        { id: 'sensor.v02_status_voltageexceeded', elementIds: ['v02_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v02_status_warning', elementIds: ['v02_status_warning'], unit: '' },
        { id: 'sensor.v02_status_thermalwarning', elementIds: ['v02_status_thermalwarning'], unit: '' },

        { id: 'sensor.v03_motor_current', elementIds: ['v03_current', 'v03_current_diw'], unit: 'A' },
        { id: 'sensor.v03_frequencyhz', elementIds: ['v03_freq', 'v03_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v03_alarmsword', elementIds: ['v03_alarmsword', 'v03_alarmsword_diw'], unit: '' },
        { id: 'sensor.v03_coil_mode', elementIds: ['v03_coil_mode'], unit: '' },
        { id: 'sensor.v03_status_buscontrol', elementIds: ['v03_status_buscontrol'], unit: '' },
        { id: 'sensor.v03_status_running', elementIds: ['v03_status_running'], unit: '' },
        { id: 'sensor.v03_warnings_word', elementIds: ['v03_warnings_word'], unit: '' },
        { id: 'sensor.v03_status_voltageexceeded', elementIds: ['v03_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v03_status_warning', elementIds: ['v03_status_warning'], unit: '' },
        { id: 'sensor.v03_status_thermalwarning', elementIds: ['v03_status_thermalwarning'], unit: '' },

        { id: 'sensor.v04_motor_current', elementIds: ['v04_current', 'v04_current_diw'], unit: 'A' },
        { id: 'sensor.v04_frequencyhz', elementIds: ['v04_freq', 'v04_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v04_alarmsword', elementIds: ['v04_alarmsword', 'v04_alarmsword_diw'], unit: '' },
        { id: 'sensor.v04_coil_mode', elementIds: ['v04_coil_mode'], unit: '' },
        { id: 'sensor.v04_status_buscontrol', elementIds: ['v04_status_buscontrol'], unit: '' },
        { id: 'sensor.v04_status_running', elementIds: ['v04_status_running'], unit: '' },
        { id: 'sensor.v04_warnings_word', elementIds: ['v04_warnings_word'], unit: '' },
        { id: 'sensor.v04_status_voltageexceeded', elementIds: ['v04_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v04_status_warning', elementIds: ['v04_status_warning'], unit: '' },
        { id: 'sensor.v04_status_thermalwarning', elementIds: ['v04_status_thermalwarning'], unit: '' },

        { id: 'sensor.v05_motor_current', elementIds: ['v05_current', 'v05_current_diw'], unit: 'A' },
        { id: 'sensor.v05_frequencyhz', elementIds: ['v05_freq', 'v05_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v05_alarmsword', elementIds: ['v05_alarmsword', 'v05_alarmsword_diw'], unit: '' },
        { id: 'sensor.v05_coil_mode', elementIds: ['v05_coil_mode'], unit: '' },
        { id: 'sensor.v05_status_buscontrol', elementIds: ['v05_status_buscontrol'], unit: '' },
        { id: 'sensor.v05_status_running', elementIds: ['v05_status_running'], unit: '' },
        { id: 'sensor.v05_warnings_word', elementIds: ['v05_warnings_word'], unit: '' },
        { id: 'sensor.v05_status_voltageexceeded', elementIds: ['v05_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v05_status_warning', elementIds: ['v05_status_warning'], unit: '' },
        { id: 'sensor.v05_status_thermalwarning', elementIds: ['v05_status_thermalwarning'], unit: '' },

        { id: 'sensor.v06_motor_current', elementIds: ['v06_current', 'v06_current_diw'], unit: 'A' },
        { id: 'sensor.v06_frequencyhz', elementIds: ['v06_freq', 'v06_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v06_alarmsword', elementIds: ['v06_alarmsword', 'v06_alarmsword_diw'], unit: '' },
        { id: 'sensor.v06_coil_mode', elementIds: ['v06_coil_mode'], unit: '' },
        { id: 'sensor.v06_status_buscontrol', elementIds: ['v06_status_buscontrol'], unit: '' },
        { id: 'sensor.v06_status_running', elementIds: ['v06_status_running'], unit: '' },
        { id: 'sensor.v06_warnings_word', elementIds: ['v06_warnings_word'], unit: '' },
        { id: 'sensor.v06_status_voltageexceeded', elementIds: ['v06_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v06_status_warning', elementIds: ['v06_status_warning'], unit: '' },
        { id: 'sensor.v06_status_thermalwarning', elementIds: ['v06_status_thermalwarning'], unit: '' },

        { id: 'sensor.v07_motor_current', elementIds: ['v07_current', 'v07_current_diw'], unit: 'A' },
        { id: 'sensor.v07_frequencyhz', elementIds: ['v07_freq', 'v07_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v07_alarmsword', elementIds: ['v07_alarmsword', 'v07_alarmsword_diw'], unit: '' },
        { id: 'sensor.v07_coil_mode', elementIds: ['v07_coil_mode'], unit: '' },
        { id: 'sensor.v07_status_buscontrol', elementIds: ['v07_status_buscontrol'], unit: '' },
        { id: 'sensor.v07_status_running', elementIds: ['v07_status_running'], unit: '' },
        { id: 'sensor.v07_warnings_word', elementIds: ['v07_warnings_word'], unit: '' },
        { id: 'sensor.v07_status_voltageexceeded', elementIds: ['v07_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v07_status_warning', elementIds: ['v07_status_warning'], unit: '' },
        { id: 'sensor.v07_status_thermalwarning', elementIds: ['v07_status_thermalwarning'], unit: '' },

        { id: 'sensor.v08_motor_current', elementIds: ['v08_current', 'v08_current_diw'], unit: 'A' },
        { id: 'sensor.v08_frequencyhz', elementIds: ['v08_freq', 'v08_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v08_alarmsword', elementIds: ['v08_alarmsword', 'v08_alarmsword_diw'], unit: '' },
        { id: 'sensor.v08_coil_mode', elementIds: ['v08_coil_mode'], unit: '' },
        { id: 'sensor.v08_status_buscontrol', elementIds: ['v08_status_buscontrol'], unit: '' },
        { id: 'sensor.v08_status_running', elementIds: ['v08_status_running'], unit: '' },
        { id: 'sensor.v08_warnings_word', elementIds: ['v08_warnings_word'], unit: '' },
        { id: 'sensor.v08_status_voltageexceeded', elementIds: ['v08_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v08_status_warning', elementIds: ['v08_status_warning'], unit: '' },
        { id: 'sensor.v08_status_thermalwarning', elementIds: ['v08_status_thermalwarning'], unit: '' },

        { id: 'sensor.v09_motor_current', elementIds: ['v09_current', 'v09_current_diw'], unit: 'A' },
        { id: 'sensor.v09_frequencyhz', elementIds: ['v09_freq', 'v09_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v09_alarmsword', elementIds: ['v09_alarmsword', 'v09_alarmsword_diw'], unit: '' },
        { id: 'sensor.v09_coil_mode', elementIds: ['v09_coil_mode'], unit: '' },
        { id: 'sensor.v09_status_buscontrol', elementIds: ['v09_status_buscontrol'], unit: '' },
        { id: 'sensor.v09_status_running', elementIds: ['v09_status_running'], unit: '' },
        { id: 'sensor.v09_warnings_word', elementIds: ['v09_warnings_word'], unit: '' },
        { id: 'sensor.v09_status_voltageexceeded', elementIds: ['v09_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v09_status_warning', elementIds: ['v09_status_warning'], unit: '' },
        { id: 'sensor.v09_status_thermalwarning', elementIds: ['v09_status_thermalwarning'], unit: '' },

        { id: 'sensor.v10_motor_current', elementIds: ['v10_current', 'v10_current_diw'], unit: 'A' },
        { id: 'sensor.v10_frequencyhz', elementIds: ['v10_freq', 'v10_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v10_alarmsword', elementIds: ['v10_alarmsword', 'v10_alarmsword_diw'], unit: '' },
        { id: 'sensor.v10_coil_mode', elementIds: ['v10_coil_mode'], unit: '' },
        { id: 'sensor.v10_status_buscontrol', elementIds: ['v10_status_buscontrol'], unit: '' },
        { id: 'sensor.v10_status_running', elementIds: ['v10_status_running'], unit: '' },
        { id: 'sensor.v10_warnings_word', elementIds: ['v10_warnings_word'], unit: '' },
        { id: 'sensor.v10_status_voltageexceeded', elementIds: ['v10_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v10_status_warning', elementIds: ['v10_status_warning'], unit: '' },
        { id: 'sensor.v10_status_thermalwarning', elementIds: ['v10_status_thermalwarning'], unit: '' },

        { id: 'sensor.v18_motor_current', elementIds: ['v18_current', 'v18_current_diw'], unit: 'A' },
        { id: 'sensor.v18_frequencyhz', elementIds: ['v18_freq', 'v18_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v18_alarmsword', elementIds: ['v18_alarmsword', 'v18_alarmsword_diw'], unit: '' },
        { id: 'sensor.v18_coil_mode', elementIds: ['v18_coil_mode'], unit: '' },
        { id: 'sensor.v18_status_buscontrol', elementIds: ['v18_status_buscontrol'], unit: '' },
        { id: 'sensor.v18_status_running', elementIds: ['v18_status_running'], unit: '' },
        { id: 'sensor.v18_warnings_word', elementIds: ['v18_warnings_word'], unit: '' },
        { id: 'sensor.v18_status_voltageexceeded', elementIds: ['v18_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v18_status_warning', elementIds: ['v18_status_warning'], unit: '' },
        { id: 'sensor.v18_status_thermalwarning', elementIds: ['v18_status_thermalwarning'], unit: '' },

        { id: 'sensor.v19_motor_current', elementIds: ['v19_current', 'v19_current_diw'], unit: 'A' },
        { id: 'sensor.v19_frequencyhz', elementIds: ['v19_freq', 'v19_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v19_alarmsword', elementIds: ['v19_alarmsword', 'v19_alarmsword_diw'], unit: '' },
        { id: 'sensor.v19_coil_mode', elementIds: ['v19_coil_mode'], unit: '' },
        { id: 'sensor.v19_status_buscontrol', elementIds: ['v19_status_buscontrol'], unit: '' },
        { id: 'sensor.v19_status_running', elementIds: ['v19_status_running'], unit: '' },
        { id: 'sensor.v19_warnings_word', elementIds: ['v19_warnings_word'], unit: '' },
        { id: 'sensor.v19_status_voltageexceeded', elementIds: ['v19_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v19_status_warning', elementIds: ['v19_status_warning'], unit: '' },
        { id: 'sensor.v19_status_thermalwarning', elementIds: ['v19_status_thermalwarning'], unit: '' },

        { id: 'sensor.v20_motor_current', elementIds: ['v20_current', 'v20_current_diw'], unit: 'A' },
        { id: 'sensor.v20_frequencyhz', elementIds: ['v20_freq', 'v20_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v20_alarmsword', elementIds: ['v20_alarmsword', 'v20_alarmsword_diw'], unit: '' },
        { id: 'sensor.v20_coil_mode', elementIds: ['v20_coil_mode'], unit: '' },
        { id: 'sensor.v20_status_buscontrol', elementIds: ['v20_status_buscontrol'], unit: '' },
        { id: 'sensor.v20_status_running', elementIds: ['v20_status_running'], unit: '' },
        { id: 'sensor.v20_warnings_word', elementIds: ['v20_warnings_word'], unit: '' },
        { id: 'sensor.v20_status_voltageexceeded', elementIds: ['v20_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v20_status_warning', elementIds: ['v20_status_warning'], unit: '' },
        { id: 'sensor.v20_status_thermalwarning', elementIds: ['v20_status_thermalwarning'], unit: '' },

        { id: 'sensor.v21_motor_current', elementIds: ['v21_current', 'v21_current_diw'], unit: 'A' },
        { id: 'sensor.v21_frequencyhz', elementIds: ['v21_freq', 'v21_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v21_alarmsword', elementIds: ['v21_alarmsword', 'v21_alarmsword_diw'], unit: '' },
        { id: 'sensor.v21_coil_mode', elementIds: ['v21_coil_mode'], unit: '' },
        { id: 'sensor.v21_status_buscontrol', elementIds: ['v21_status_buscontrol'], unit: '' },
        { id: 'sensor.v21_status_running', elementIds: ['v21_status_running'], unit: '' },
        { id: 'sensor.v21_warnings_word', elementIds: ['v21_warnings_word'], unit: '' },
        { id: 'sensor.v21_status_voltageexceeded', elementIds: ['v21_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v21_status_warning', elementIds: ['v21_status_warning'], unit: '' },
        { id: 'sensor.v21_status_thermalwarning', elementIds: ['v21_status_thermalwarning'], unit: '' },

        { id: 'sensor.v22_motor_current', elementIds: ['v22_current', 'v22_current_diw'], unit: 'A' },
        { id: 'sensor.v22_frequencyhz', elementIds: ['v22_freq', 'v22_freq_diw'], unit: 'Hz' },
        { id: 'sensor.v22_alarmsword', elementIds: ['v22_alarmsword', 'v22_alarmsword_diw'], unit: '' },
        { id: 'sensor.v22_coil_mode', elementIds: ['v22_coil_mode'], unit: '' },
        { id: 'sensor.v22_status_buscontrol', elementIds: ['v22_status_buscontrol'], unit: '' },
        { id: 'sensor.v22_status_running', elementIds: ['v22_status_running'], unit: '' },
        { id: 'sensor.v22_warnings_word', elementIds: ['v22_warnings_word'], unit: '' },
        { id: 'sensor.v22_status_voltageexceeded', elementIds: ['v22_status_voltageexceeded'], unit: '' },
        { id: 'sensor.v22_status_warning', elementIds: ['v22_status_warning'], unit: '' },
        { id: 'sensor.v22_status_thermalwarning', elementIds: ['v22_status_thermalwarning'], unit: '' },
      
    ];


    sliders.forEach(slider => {
        const valueSpan = slider.closest('.wrap__slider').querySelector('.slider-value');
        const unitSpan = slider.closest('.wrap__slider').querySelector('.slider-unit');
        valueSpan.textContent = slider.value;

        slider.addEventListener('input', function () {
            valueSpan.textContent = slider.value;
        });
    });


    function hideElement(element, animationClass) {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.add('hidden');
    element.classList.remove(animationClass);
  }, 500); // Время анимации должно совпадать с временем в CSS
}

function showElement(element, animationClass) {
  element.classList.remove('hidden');
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, 500); // Время анимации должно совпадать с временем в CSS
}

pritochkiButton.addEventListener('click', function () {
  if (buttonsMenuCardP.classList.contains('hidden')) {
    showElement(buttonsMenuCardP, 'animate-in-left', 'animate-out-left');
    hideElement(buttonsMenuCardV, 'animate-out-right');
  }
  pritochkiButton.classList.add('active');
  vityajkiButton.classList.remove('active');
});

vityajkiButton.addEventListener('click', function () {
  if (buttonsMenuCardV.classList.contains('hidden')) {
    showElement(buttonsMenuCardV, 'animate-in-right', 'animate-out-right');
    hideElement(buttonsMenuCardP, 'animate-out-left');
  }
  vityajkiButton.classList.add('active');
  pritochkiButton.classList.remove('active');
});

buttonsMenuCardP.classList.add('hidden');
buttonsMenuCardV.classList.add('hidden');

//*START*/
//открытие V/P 01-22/
function handleButtonClick(event) {
  const button = event.currentTarget;
  const type = button.dataset.type;
  const number = button.dataset.number;
  const displayMenuId = `display-menu-${type}${number}`;
  const displayMenu = document.getElementById(displayMenuId);

  if (!displayMenu) {
    return;
  }

  const hideAnimationClass = type === 'v' ? 'animate-out-left' : 'animate-out-right';
  const showAnimationClass = type === 'v' ? 'animate-in-right' : 'animate-in-left';

  hideElement(displayMenuMain, hideAnimationClass);
  hideElement(buttonsMenuCardP, hideAnimationClass);
  hideElement(buttonsMenuCardV, hideAnimationClass);
  showElement(displayMenu, showAnimationClass);
}

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
//открытие V/P 01-22/
//END/

function hideAllVElements() {
  const allVElements = document.querySelectorAll('[id^="display-menu-v"]');
  allVElements.forEach(element => {
    element.classList.remove('hidden'); // Убираем класс 'hidden' перед применением анимации
    hideElement(element, 'animate-out-left');
  });
}
function hideAllPElements() {
  const allPElements = document.querySelectorAll('[id^="display-menu-p"]');
  allPElements.forEach(element => {
    element.classList.remove('hidden'); // Убираем класс 'hidden' перед применением анимации
    hideElement(element, 'animate-out-right');
  });
}

document.addEventListener('click', function (event) {
  if (event.target && event.target.matches('button[data-toggle="#back_vityajki"]')) {
    hideAllVElements();
    showElement(displayMenuMain, 'animate-in-left');
    showElement(buttonsMenuCardV, 'animate-in-left');
  } else if (event.target && event.target.matches('button[data-toggle="#back_pritochki"]')) {
    hideAllPElements();
    showElement(displayMenuMain, 'animate-in-right');
    showElement(buttonsMenuCardP, 'animate-in-right');
  }
});


    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log('WebSocket connection established');
        socket.send(JSON.stringify({
            type: 'auth',
            access_token: token
        }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);

        if (data.type === 'auth_ok') {
            console.log('WebSocket authentication successful');
            fetchDataAndUpdateUI();
            socket.send(JSON.stringify({
                id: 1,
                type: 'subscribe_entities'
            }));
            console.log('Subscription request sent');
        }

        if (data.type === 'result' && data.success && data.id === 1) {
            console.log('Subscription successful');
        }

        if (data.type === 'event' && data.id === 1 && data.event) {
            console.log('Received event data:', data.event);
            console.log('Full event data:', JSON.stringify(data.event, null, 2)); // Логирование всей структуры данных
            updateUIWithEventData(data.event);
        }
    };


    function updateUIWithEventData(event) {
        console.log('Received event data:', event);

        sensors.forEach(sensor => {
            const { id, elementIds, unit } = sensor;

            if (event.c && event.c[id]) {
                const value = event.c[id]['+'].s;
                console.log(`Sensor ${id} value:`, value);
                sensorStates[id] = value; // Обновляем состояние сенсора
                if (Array.isArray(elementIds)) {
                    elementIds.forEach(elementId => {
                        const element = document.getElementById(elementId);
                        if (element) {
                            element.textContent = `${value} ${unit}`;
                        }
                    });
                }
            }

            // Проверка и обновление состояния кнопок
            if (id.includes('_workmode_status') || id.includes('_error_status') || id.includes('_status_running') || id.includes('_alarmsword')) {
                const isVSensor = id.includes('_status_running') || id.includes('_alarmsword');
                const workmodeId = isVSensor ? id.replace('_alarmsword', '_status_running') : id.replace('_error_status', '_workmode_status');
                const errorId = isVSensor ? id.replace('_status_running', '_alarmsword') : id.replace('_workmode_status', '_error_status');
                const buttonId = id.replace('sensor.', '').replace(/_(workmode_status|error_status|status_running|alarmsword)/, '-button');
                const workmodeState = sensorStates[workmodeId] || null;
                const errorState = sensorStates[errorId] || null;

                // Обновляем состояние кнопки с учетом приоритета ошибок
                if (errorState && errorState !== 'Ошибок нет') {
                    console.log(`Updating button state for ${buttonId}: errorState = ${errorState}`);
                    updateButtonState(buttonId, null, errorState, isVSensor);
                } else if (workmodeState) {
                    console.log(`Updating button state for ${buttonId}: workmodeState = ${workmodeState}`);
                    updateButtonState(buttonId, workmodeState, null, isVSensor);
                } else {
                    console.log(`Updating button state for ${buttonId}: setting to mode_normal`);
                    updateButtonState(buttonId, null, null, isVSensor);
                }
            }
        });
    }


    function fetchDataAndUpdateUI() {
        Promise.all(sensors.map(sensor => fetchSensorData(sensor)))
            .then(results => {
                results.forEach(({ elementIds, value, unit, id }) => {
                    sensorStates[id] = value; // Обновляем состояние сенсора
                    if (Array.isArray(elementIds)) {
                        elementIds.forEach(elementId => {
                            const element = document.getElementById(elementId);
                            if (element) {
                                element.textContent = `${value} ${unit}`;
                            }
                        });
                    }

                    // Проверка и обновление состояния кнопок
                    if (id.includes('_workmode_status') || id.includes('_error_status')) {
                        const workmodeId = id.replace('_error_status', '_workmode_status');
                        const errorId = id.replace('_workmode_status', '_error_status');
                        const buttonId = id.replace('sensor.', '').replace(/_(workmode_status|error_status)/, '-button');
                        const workmodeState = sensorStates[workmodeId] || null;
                        const errorState = sensorStates[errorId] || null;

                        // Обновляем состояние кнопки с учетом приоритета ошибок
                        if (errorState && errorState !== 'Ошибок нет') {
                            console.log(`Updating button state for ${buttonId}: errorState = ${errorState}`);
                            updateButtonState(buttonId, null, errorState);
                        } else if (workmodeState) {
                            console.log(`Updating button state for ${buttonId}: workmodeState = ${workmodeState}`);
                            updateButtonState(buttonId, workmodeState, null);
                        } else {
                            console.log(`Updating button state for ${buttonId}: setting to mode_normal`);
                            updateButtonState(buttonId, null, null);
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching sensor data:', error);
            });
    }




    function fetchSensorData({ id, elementIds, unit }) {
        return fetch(`https://kukzjhumsnjlw8xzts2cke6uwbbfy8bi.ui.nabu.casa/api/states/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            return { elementIds, value: data.state, unit, id };
        });
    }

    function updateButtonState(buttonId, workmodeState, errorState, isVSensor = false) {
        console.log(`Updating button state for ${buttonId}: workmodeState = ${workmodeState}, errorState = ${errorState}`);
        const button = document.getElementById(buttonId);
        if (!button) return;

        button.classList.remove('mode_normal', 'mode_on', 'mode_off', 'mode_alarm');

        if (errorState && errorState !== 'Ошибок нет') {
            button.classList.add('mode_alarm');
        } else if (isVSensor ? workmodeState === 'Не запущено' : workmodeState === 'Выключено') {
            button.classList.add('mode_off');
        } else if (isVSensor ? workmodeState === 'Запущено' : ['Оптимальный', 'Комфорт', 'ЭКО'].includes(workmodeState)) {
            button.classList.add('mode_on');
        } else {
            button.classList.add('mode_normal');
        }
    }



});
