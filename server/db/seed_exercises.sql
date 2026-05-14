-- Insert 60 new exercises distributed randomly across 30 users
-- Only columns exposed by the create exercise form are populated
-- (picture and location are intentionally omitted)

INSERT INTO exercises (user_id, title, exercise_type, date, duration, calories, description, pace, distance) VALUES
  (21, 'Morning Run', 'running', CURRENT_DATE - INTERVAL '35 days', 51, 428, 'Beautiful weather today', 8.31, 11.12),
  (29, 'Morning Yoga', 'yoga', CURRENT_DATE - INTERVAL '7 days', 47, 88, 'Deep stretches', NULL, NULL),
  (3, 'Long Distance Ride', 'cycling', CURRENT_DATE - INTERVAL '50 days', 36, 874, 'Loved the scenery', 29.32, 59.09),
  (14, 'Time Trial', 'cycling', CURRENT_DATE - INTERVAL '1 days', 101, 1128, 'Loved the scenery', 30.18, 21.18),
  (14, 'Open Water Swim', 'swimming', CURRENT_DATE - INTERVAL '86 days', 33, 690, 'Great cardio session', 1.65, 1.45),
  (12, 'Squat Session', 'weightlifting', CURRENT_DATE - INTERVAL '117 days', 81, 172, 'Solid session', NULL, NULL),
  (18, 'Tempo Run', 'running', CURRENT_DATE - INTERVAL '160 days', 90, 500, 'Tough but rewarding', 7.78, 13.34),
  (19, 'Mountain Bike Ride', 'cycling', CURRENT_DATE - INTERVAL '74 days', 88, 1091, 'Great ride with the group', 34.7, 69.87),
  (28, 'Tempo Run', 'running', CURRENT_DATE - INTERVAL '41 days', 78, 573, 'Beautiful weather today', 6.67, 5.51),
  (9, 'Active Recovery', 'none', CURRENT_DATE - INTERVAL '62 days', 20, 186, 'Easy movement', NULL, NULL),
  (6, 'Back and Biceps', 'weightlifting', CURRENT_DATE - INTERVAL '176 days', 89, 477, 'Solid session', NULL, NULL),
  (18, 'Recovery Spin', 'cycling', CURRENT_DATE - INTERVAL '8 days', 88, 1141, 'Great ride with the group', 31.1, 38.08),
  (3, 'Recovery Spin', 'cycling', CURRENT_DATE - INTERVAL '164 days', 157, 705, 'Climbed some serious hills', 24.18, 28.54),
  (8, 'Restorative Session', 'yoga', CURRENT_DATE - INTERVAL '109 days', 67, 229, 'Centered and calm', NULL, NULL),
  (29, 'Power Yoga', 'yoga', CURRENT_DATE - INTERVAL '130 days', 34, 115, 'Centered and calm', NULL, NULL),
  (16, 'Morning Run', 'running', CURRENT_DATE - INTERVAL '174 days', 39, 363, 'Tough but rewarding', 6.9, 3.76),
  (13, 'Stair Climber', 'other', CURRENT_DATE - INTERVAL '141 days', 62, 697, 'Good change of pace', NULL, NULL),
  (28, 'Evening Jog', 'running', CURRENT_DATE - INTERVAL '75 days', 63, 314, 'Beautiful weather today', 6.96, 8.44),
  (24, 'Commute Ride', 'cycling', CURRENT_DATE - INTERVAL '160 days', 57, 1191, 'Loved the scenery', 20.97, 54.73),
  (20, 'Commute Ride', 'cycling', CURRENT_DATE - INTERVAL '135 days', 71, 852, 'Smooth and steady', 33.37, 51.93),
  (16, 'Evening Jog', 'running', CURRENT_DATE - INTERVAL '14 days', 59, 445, 'Pushed hard on the hills', 6.08, 9.81),
  (3, 'Interval Training', 'running', CURRENT_DATE - INTERVAL '32 days', 88, 328, 'Tough but rewarding', 7.97, 14.36),
  (6, 'Group Ride', 'cycling', CURRENT_DATE - INTERVAL '176 days', 168, 1073, 'Climbed some serious hills', 19.02, 31.82),
  (22, 'Boxing Session', 'other', CURRENT_DATE - INTERVAL '30 days', 96, 431, 'Different but enjoyable', NULL, NULL),
  (8, 'Mountain Bike Ride', 'cycling', CURRENT_DATE - INTERVAL '141 days', 35, 902, 'Smooth and steady', 19.6, 25.42),
  (3, 'Active Recovery', 'none', CURRENT_DATE - INTERVAL '84 days', 14, 58, 'Just keeping it light', NULL, NULL),
  (3, 'Vinyasa Flow', 'yoga', CURRENT_DATE - INTERVAL '54 days', 62, 204, 'Centered and calm', NULL, NULL),
  (18, '5K Run', 'running', CURRENT_DATE - INTERVAL '104 days', 51, 684, 'Legs felt heavy', 5.86, 4.16),
  (14, 'Back and Biceps', 'weightlifting', CURRENT_DATE - INTERVAL '172 days', 59, 177, 'Felt strong today', NULL, NULL),
  (21, 'Rock Climbing', 'other', CURRENT_DATE - INTERVAL '86 days', 81, 572, 'Fun session', NULL, NULL),
  (26, 'Park Loop', 'running', CURRENT_DATE - INTERVAL '114 days', 44, 749, 'Easy recovery pace', 5.63, 5.2),
  (15, 'Mountain Bike Ride', 'cycling', CURRENT_DATE - INTERVAL '12 days', 170, 400, 'Windy day out there', 28.04, 47.84),
  (1, 'Park Loop', 'running', CURRENT_DATE - INTERVAL '123 days', 72, 697, 'New personal best!', 5.96, 7.81),
  (2, 'Group Ride', 'cycling', CURRENT_DATE - INTERVAL '116 days', 129, 571, 'Great ride with the group', 20.7, 58.76),
  (24, 'Hot Yoga', 'yoga', CURRENT_DATE - INTERVAL '48 days', 51, 119, 'Felt grounded', NULL, NULL),
  (10, 'Road Cycling', 'cycling', CURRENT_DATE - INTERVAL '80 days', 168, 362, 'Loved the scenery', 16.14, 50.89),
  (17, 'Vinyasa Flow', 'yoga', CURRENT_DATE - INTERVAL '47 days', 52, 100, 'Very relaxing', NULL, NULL),
  (3, 'Rock Climbing', 'other', CURRENT_DATE - INTERVAL '145 days', 81, 261, 'Great cross-training', NULL, NULL),
  (8, 'Restorative Session', 'yoga', CURRENT_DATE - INTERVAL '107 days', 59, 100, 'Very relaxing', NULL, NULL),
  (22, 'Restorative Session', 'yoga', CURRENT_DATE - INTERVAL '52 days', 40, 146, 'Deep stretches', NULL, NULL),
  (22, 'Walk', 'none', CURRENT_DATE - INTERVAL '33 days', 26, 151, 'Just keeping it light', NULL, NULL),
  (22, 'Soccer Game', 'other', CURRENT_DATE - INTERVAL '18 days', 70, 675, 'Different but enjoyable', NULL, NULL),
  (1, 'Squat Session', 'weightlifting', CURRENT_DATE - INTERVAL '137 days', 36, 187, 'Form was clean', NULL, NULL),
  (7, 'Yin Yoga', 'yoga', CURRENT_DATE - INTERVAL '62 days', 42, 97, 'Worked on flexibility', NULL, NULL),
  (12, 'Freestyle Session', 'swimming', CURRENT_DATE - INTERVAL '180 days', 73, 478, 'Worked on breathing', 1.95, 2.96),
  (26, 'Rowing', 'other', CURRENT_DATE - INTERVAL '141 days', 115, 618, 'Fun session', NULL, NULL),
  (10, 'Rock Climbing', 'other', CURRENT_DATE - INTERVAL '27 days', 63, 259, 'Great cross-training', NULL, NULL),
  (24, 'Vinyasa Flow', 'yoga', CURRENT_DATE - INTERVAL '53 days', 38, 234, 'Centered and calm', NULL, NULL),
  (23, 'Freestyle Session', 'swimming', CURRENT_DATE - INTERVAL '64 days', 52, 450, 'Felt smooth in the water', 2.86, 2.62),
  (3, 'Jump Rope', 'other', CURRENT_DATE - INTERVAL '85 days', 35, 201, 'Mixed it up today', NULL, NULL),
  (25, 'Sprint Session', 'running', CURRENT_DATE - INTERVAL '180 days', 76, 764, 'New personal best!', 6.92, 3.12),
  (3, 'Stretching', 'none', CURRENT_DATE - INTERVAL '149 days', 12, 144, 'Easy movement', NULL, NULL),
  (18, 'Tempo Run', 'running', CURRENT_DATE - INTERVAL '93 days', 25, 515, 'New personal best!', 9.05, 12.55),
  (28, 'Long Run', 'running', CURRENT_DATE - INTERVAL '90 days', 51, 305, 'Easy recovery pace', 8.51, 13.61),
  (14, 'Tennis Match', 'other', CURRENT_DATE - INTERVAL '45 days', 50, 699, 'Great cross-training', NULL, NULL),
  (29, 'Upper Body', 'weightlifting', CURRENT_DATE - INTERVAL '105 days', 77, 320, 'Legs are toast', NULL, NULL),
  (26, 'Basketball Pickup', 'other', CURRENT_DATE - INTERVAL '179 days', 50, 603, 'Mixed it up today', NULL, NULL),
  (4, 'Upper Body', 'weightlifting', CURRENT_DATE - INTERVAL '51 days', 60, 263, 'Great pump', NULL, NULL),
  (27, 'Chest and Triceps', 'weightlifting', CURRENT_DATE - INTERVAL '57 days', 82, 266, 'Solid session', NULL, NULL),
  (1, 'Basketball Pickup', 'other', CURRENT_DATE - INTERVAL '17 days', 72, 342, 'Different but enjoyable', NULL, NULL);

-- Distribution per user:
-- user 1: 3
-- user 2: 1
-- user 3: 8
-- user 4: 1
-- user 6: 2
-- user 7: 1
-- user 8: 3
-- user 9: 1
-- user 10: 2
-- user 12: 2
-- user 13: 1
-- user 14: 4
-- user 15: 1
-- user 16: 2
-- user 17: 1
-- user 18: 4
-- user 19: 1
-- user 20: 1
-- user 21: 2
-- user 22: 4
-- user 23: 1
-- user 24: 3
-- user 25: 1
-- user 26: 3
-- user 27: 1
-- user 28: 3
-- user 29: 3
-- Users with exercises: 27/30
