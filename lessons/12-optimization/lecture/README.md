- useMemo on calculateWeeks
- memo
- useCallback

- useMemo on calculateWeeks.js
  - console.time it
  - console.log when it memos
  - use devTools Performance tab to see how fast or slow it is, and if slower than 30ms after 6x slower, useMemo to optimize:
  # useMemo: only rerender if state changes
  const weeks = useMemo(() => {
      // it's a calculation instead of an effect
      return calculateWeeks(posts, startDate, numWeeks)
  }, [posts, startData, numWeeks])

  # use callBacks
  const handleTabChange = useCallback   === const handleTabChange = () =>

  
- Go to the feed
- Show how the profiler works
- React.memo on FeedPost and show how it saves on renders
- show that post={post} is new each time, causing
  - spread the props instead, fixed (but ehhhhh)
- Go to the calendar
  - make it huge (don't forget the CSS for the height)
  - start memoing everything
  - useCallback (just a useMemo shortcut for functions)

