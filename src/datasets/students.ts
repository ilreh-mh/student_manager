type Gender = 'm' | 'f' | 'x';

export interface IStudent {
    id: number;
    name: string,
    class: string;
    birthdate: string; // YYYY-MM-DD
    gender: Gender;
}

export interface IExchangeStudent {
    extId: number;
    name: string,
    class: string;
    birthdate: string; // YYYY-MM-DD
    gender: Gender;
    country?: string;
}

export const studentData: (IStudent | IExchangeStudent)[] = [
    { id: 1, name: 'Bauer Emil', class: '1-AHELE', birthdate: '2013-03-02', gender: 'm' },
    { id: 2, name: 'Becker Carla', class: '1-AHELE', birthdate: '2013-06-20', gender: 'f' },
    { id: 3, name: 'Fischer Anton', class: '1-AHELE', birthdate: '2013-12-30', gender: 'm' },
    { id: 4, name: 'Hermann Julian', class: '1-AHELE', birthdate: '2013-05-12', gender: 'm' },
    { id: 5, name: 'Beck Niklas', class: '1-BHELE', birthdate: '2013-01-19', gender: 'm' },
    { id: 6, name: 'Berger Maximilian', class: '1-BHELE', birthdate: '2013-10-02', gender: 'm' },
    { id: 7, name: 'Frank Max', class: '1-BHELE', birthdate: '2013-10-09', gender: 'm' },
    { id: 8, name: 'Friedrich Marc', class: '1-BHELE', birthdate: '2013-11-12', gender: 'm' },
    { id: 9, name: 'Bauer Benjamin', class: '2-AHELE', birthdate: '2012-07-07', gender: 'm' },
    { id: 10, name: 'Becker Amelie', class: '2-AHELE', birthdate: '2012-08-28', gender: 'f' },
    { id: 11, name: 'Fischer Philipp', class: '2-AHELE', birthdate: '2012-02-26', gender: 'm' },
    { id: 12, name: 'Fischer Sofia', class: '2-AHELE', birthdate: '2012-01-14', gender: 'f' },
    { id: 13, name: 'Braun Emily', class: '2-BHELE', birthdate: '2012-12-05', gender: 'f' },
    { id: 14, name: 'Hartmann Florian', class: '2-BHELE', birthdate: '2012-04-19', gender: 'm' },
    { id: 15, name: 'Hermann Lea', class: '2-BHELE', birthdate: '2012-11-21', gender: 'f' },
    { id: 16, name: 'Hofmann Felix', class: '2-BHELE', birthdate: '2012-10-22', gender: 'm' },
    { id: 17, name: 'Bauer Sara', class: '3-AHELE', birthdate: '2011-12-18', gender: 'f' },
    { id: 18, name: 'Becker Oskar', class: '3-AHELE', birthdate: '2011-09-08', gender: 'm' },
    { id: 19, name: 'Fischer Mia', class: '3-AHELE', birthdate: '2011-10-22', gender: 'f' },
    { id: 10, name: 'Friedrich Julia', class: '3-AHELE', birthdate: '2011-01-01', gender: 'f' },
    { id: 21, name: 'Fuchs Emily', class: '3-BHELE', birthdate: '2011-03-08', gender: 'f' },
    { id: 22, name: 'Hartman Alexander', class: '3-BHELE', birthdate: '2011-07-17', gender: 'm' },
    { id: 23, name: 'Herrmann Charlotte', class: '3-BHELE', birthdate: '2011-06-07', gender: 'f' },
    { id: 24, name: 'Hofmann Sophie', class: '3-BHELE', birthdate: '2011-12-27', gender: 'f' },
    { id: 25, name: 'Bauer Noah', class: '4-HELE', birthdate: '2010-05-30', gender: 'm' },
    { id: 26, name: 'Beck Leni', class: '4-HELE', birthdate: '2010-03-', gender: 'f' },
    { id: 27, name: 'Becker Max', class: '4-HELE', birthdate: '2010-09-24', gender: 'm' },
    { id: 28, name: 'Berger Laura', class: '4-HELE', birthdate: '2010-02-12', gender: 'f' },
    { extId: 4002, name: 'Wolf Paula', class: '4-HELE', birthdate: '2010-10-07', gender: 'f', country: 'usa' },
    { extId: 1840, name: 'Lorenz Leon', class: '4-HELE', birthdate: '2010-09-22', gender: 'm', country: 'gb' },
    { extId: 3941, name: 'Roth Lena', class: '4-HELE', birthdate: '2010-03-15', gender: 'f', country: 'de' }
];
