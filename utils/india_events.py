"""
MetroFlow — India Event Calendar
Author: Shubham Warang
"""

FESTIVALS = {
    '2019-01-26': ('Republic Day',           1.7),
    '2019-03-21': ('Holi',                   1.5),
    '2019-04-14': ('Ambedkar Jayanti',        1.4),
    '2019-05-01': ('Maharashtra Day',         1.6),
    '2019-08-15': ('Independence Day',        1.7),
    '2019-09-02': ('Ganesh Chaturthi Day1',   2.3),
    '2019-09-03': ('Ganesh Chaturthi Day2',   2.5),
    '2019-09-12': ('Ganesh Visarjan',         2.8),
    '2019-10-02': ('Gandhi Jayanti',          1.5),
    '2019-10-26': ('Diwali Day1',             1.8),
    '2019-10-27': ('Diwali Laxmi Pujan',      2.2),
    '2019-10-28': ('Diwali Main',             2.0),
    '2019-12-25': ('Christmas',               1.4),

    '2021-01-26': ('Republic Day',           1.7),
    '2021-03-29': ('Holi',                   1.5),
    '2021-04-14': ('Ambedkar Jayanti',        1.4),
    '2021-05-01': ('Maharashtra Day',         1.6),
    '2021-08-15': ('Independence Day',        1.7),
    '2021-08-22': ('Ganesh Chaturthi Day1',   2.3),
    '2021-08-23': ('Ganesh Chaturthi Day2',   2.5),
    '2021-09-01': ('Ganesh Visarjan',         2.8),
    '2021-10-02': ('Gandhi Jayanti',          1.5),
    '2021-11-02': ('Diwali Day1',             1.8),
    '2021-11-03': ('Diwali Laxmi Pujan',      2.2),
    '2021-11-04': ('Diwali Main',             2.0),
    '2021-12-25': ('Christmas',               1.4),
}

IPL_DATES = [
    # IPL 2019
    '2019-03-23','2019-03-24','2019-03-26',
    '2019-03-27','2019-03-29','2019-03-30',
    '2019-04-01','2019-04-02','2019-04-04',
    '2019-04-05','2019-04-07','2019-04-08',
    '2019-04-10','2019-04-11','2019-04-13',

    # IPL 2021
    '2021-04-09','2021-04-10','2021-04-11',
    '2021-04-13','2021-04-15','2021-04-17',
    '2021-04-18','2021-04-20','2021-04-22',
    '2021-04-24','2021-04-25','2021-04-27',
    '2021-05-01','2021-05-02','2021-05-04',
]

BANDH_DATES = [
    '2019-01-08',
    '2019-07-05',
    '2021-02-15',
    '2021-06-12',
]

MONSOON_MONTHS = [6, 7, 8, 9]


def get_event_info(date_str):
    is_festival = date_str in FESTIVALS
    is_cricket  = date_str in IPL_DATES
    is_bandh    = date_str in BANDH_DATES
    month       = int(date_str.split('-')[1])
    is_monsoon  = month in MONSOON_MONTHS

    festival_name = FESTIVALS[date_str][0] if is_festival else 'None'
    festival_mult = FESTIVALS[date_str][1] if is_festival else 1.0

    if is_bandh:
        overall_mult = 0.15
    elif is_festival:
        overall_mult = festival_mult
    elif is_cricket:
        overall_mult = 1.4
    else:
        overall_mult = 1.0

    return {
        'is_festival':   int(is_festival),
        'festival_name': festival_name,
        'festival_mult': festival_mult,
        'is_cricket':    int(is_cricket),
        'is_bandh':      int(is_bandh),
        'is_monsoon':    int(is_monsoon),
        'overall_mult':  overall_mult,
    }


# Test
if __name__ == '__main__':
    test_dates = [
        '2021-09-01',
        '2021-04-15',
        '2021-07-10',
        '2021-02-15',
        '2021-03-15',
    ]

    print(f"{'Date':<15} {'Event':<25} {'Mult':<8} {'Alert'}")
    print('-' * 60)
    for d in test_dates:
        info = get_event_info(d)
        mult = info['overall_mult']
        alert = ('HIGH' if mult > 1.8 else
                 'MEDIUM' if mult > 1.2 else
                 'LOW' if mult > 0.5 else 'VERY LOW')
        print(f"{d:<15} {info['festival_name']:<25} "
              f"{mult:<8} {alert}")