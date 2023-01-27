def any7(nums):
    """Are any of these numbers a 7? (True/False)"""
    result = nums.count(7)
    if result > 0:
        return(True)
    else:
        return(False)

print("should be true", any7([1, 2, 7, 4, 5]))
print("should be false", any7([1, 2, 4, 5]))
