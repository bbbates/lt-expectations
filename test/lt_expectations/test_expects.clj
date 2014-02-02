(ns lt-expectations.test-expects
	(:use expectations))


;;pass
(expect
	1
  (+ 0 1))


;;fail
(expect
	2
  (+ 1 1000))
 
