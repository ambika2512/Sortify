// Wait for Chart.js to load
window.addEventListener('load', function() {
  // --- Sorting algorithms ---
  function bubbleSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          if (visualizeStep) steps.push([...arr]);
        }
      }
    }
    return steps;
  }
  function selectionSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        if (visualizeStep) steps.push([...arr]);
      }
    }
    return steps;
  }
  function insertionSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        if (visualizeStep) steps.push([...arr]);
      }
      arr[j + 1] = key;
      if (visualizeStep) steps.push([...arr]);
    }
    return steps;
  }
  function mergeSort(arr, visualizeStep) {
    let steps = [];
    function merge(arr, l, m, r) {
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = arr.slice(l, m + 1);
      let R = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
        if (visualizeStep) steps.push([...arr]);
      }
      while (i < n1) arr[k++] = L[i++], visualizeStep && steps.push([...arr]);
      while (j < n2) arr[k++] = R[j++], visualizeStep && steps.push([...arr]);
    }
    function sort(arr, l, r) {
      if (l < r) {
        let m = Math.floor((l + r) / 2);
        sort(arr, l, m);
        sort(arr, m + 1, r);
        merge(arr, l, m, r);
      }
    }
    sort(arr, 0, arr.length - 1);
    return steps;
  }
  function quickSort(arr, visualizeStep) {
    let steps = [];
    function partition(arr, low, high) {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          if (visualizeStep) steps.push([...arr]);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      if (visualizeStep) steps.push([...arr]);
      return i + 1;
    }
    function sort(arr, low, high) {
      if (low < high) {
        let pi = partition(arr, low, high);
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
      }
    }
    sort(arr, 0, arr.length - 1);
    return steps;
  }
  function heapSort(arr, visualizeStep) {
    let steps = [];
    let n = arr.length;
    function heapify(arr, n, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        if (visualizeStep) steps.push([...arr]);
        heapify(arr, n, largest);
      }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      if (visualizeStep) steps.push([...arr]);
      heapify(arr, i, 0);
    }
    return steps;
  }
  function countingSort(arr, visualizeStep) {
    let steps = [];
    let n = arr.length;
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(n).fill(0);
    for (let i = 0; i < n; i++) count[arr[i] - min]++;
    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
      if (visualizeStep) steps.push([...output]);
    }
    for (let i = 0; i < n; i++) arr[i] = output[i];
    if (visualizeStep) steps.push([...arr]);
    return steps;
  }

  // --- Algorithm definitions and examples ---
  const ALGORITHMS = {
    bubbleSort: {
      name: "Bubble Sort",
      definition: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
      logic: "Compare each pair of adjacent items and swap them if they are in the wrong order. Repeat until no swaps are needed.",
      example: { input: [5, 1, 4, 2], output: [1, 2, 4, 5] },
      func: bubbleSort,
      code: `function bubbleSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                if (visualizeStep) steps.push([...arr]);
            }
        }
    }
    return steps;
}`,
      time: "Best: O(n), Average: O(n²), Worst: O(n²)",
      space: "O(1)"
    },
    selectionSort: {
      name: "Selection Sort",
      definition: "Selection Sort divides the array into a sorted and unsorted part, and repeatedly selects the smallest element from the unsorted part.",
      logic: "Find the minimum element in the unsorted part and swap it with the first unsorted element.",
      example: { input: [29, 10, 14, 37, 13], output: [10, 13, 14, 29, 37] },
      func: selectionSort,
      code: `function selectionSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            if (visualizeStep) steps.push([...arr]);
        }
    }
    return steps;
}`,
      time: "Best: O(n²), Average: O(n²), Worst: O(n²)",
      space: "O(1)"
    },
    insertionSort: {
      name: "Insertion Sort",
      definition: "Insertion Sort builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.",
      logic: "Take each element and insert it into its correct position in the sorted part of the array.",
      example: { input: [12, 11, 13, 5, 6], output: [5, 6, 11, 12, 13] },
      func: insertionSort,
      code: `function insertionSort(arr, visualizeStep) {
    let n = arr.length;
    let steps = [];
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            if (visualizeStep) steps.push([...arr]);
        }
        arr[j + 1] = key;
        if (visualizeStep) steps.push([...arr]);
    }
    return steps;
}`,
      time: "Best: O(n), Average: O(n²), Worst: O(n²)",
      space: "O(1)"
    },
    mergeSort: {
      name: "Merge Sort",
      definition: "Merge Sort is a divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.",
      logic: "Divide the array into two halves, recursively sort them, then merge the sorted halves.",
      example: { input: [38, 27, 43, 3, 9, 82, 10], output: [3, 9, 10, 27, 38, 43, 82] },
      func: mergeSort,
      code: `function mergeSort(arr, visualizeStep) {
    let steps = [];
    function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = arr.slice(l, m + 1);
        let R = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
            if (visualizeStep) steps.push([...arr]);
        }
        while (i < n1) arr[k++] = L[i++], visualizeStep && steps.push([...arr]);
        while (j < n2) arr[k++] = R[j++], visualizeStep && steps.push([...arr]);
    }
    function sort(arr, l, r) {
        if (l < r) {
            let m = Math.floor((l + r) / 2);
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    sort(arr, 0, arr.length - 1);
    return steps;
}`,
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
      space: "O(n)"
    },
    quickSort: {
      name: "Quick Sort",
      definition: "Quick Sort picks a 'pivot' element and partitions the array around the pivot, placing smaller elements before it and larger elements after it.",
      logic: "Choose a pivot, partition around it, then recursively sort the sub-arrays.",
      example: { input: [64, 34, 25, 12, 22, 11, 90], output: [11, 12, 22, 25, 34, 64, 90] },
      func: quickSort,
      code: `function quickSort(arr, visualizeStep) {
    let steps = [];
    function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                if (visualizeStep) steps.push([...arr]);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        if (visualizeStep) steps.push([...arr]);
        return i + 1;
    }
    function sort(arr, low, high) {
        if (low < high) {
            let pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    sort(arr, 0, arr.length - 1);
    return steps;
}`,
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n²)",
      space: "O(log n)"
    },
    heapSort: {
      name: "Heap Sort",
      definition: "Heap Sort uses a binary heap data structure to sort elements. It first builds a max heap, then repeatedly extracts the maximum element.",
      logic: "Build a max heap, then repeatedly extract the root (maximum) and place it at the end.",
      example: { input: [4, 10, 3, 5, 1], output: [1, 3, 4, 5, 10] },
      func: heapSort,
      code: `function heapSort(arr, visualizeStep) {
    let steps = [];
    let n = arr.length;
    function heapify(arr, n, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            if (visualizeStep) steps.push([...arr]);
            heapify(arr, n, largest);
        }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        if (visualizeStep) steps.push([...arr]);
        heapify(arr, i, 0);
    }
    return steps;
}`,
      time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
      space: "O(1)"
    },
    countingSort: {
      name: "Counting Sort",
      definition: "Counting Sort counts the number of objects having distinct key values, then calculates the positions of each key in the output sequence.",
      logic: "Count occurrences of each element, then reconstruct the array in sorted order.",
      example: { input: [1, 4, 1, 2, 7, 5, 2], output: [1, 1, 2, 2, 4, 5, 7] },
      func: countingSort,
      code: `function countingSort(arr, visualizeStep) {
    let steps = [];
    let n = arr.length;
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(n).fill(0);
    for (let i = 0; i < n; i++) count[arr[i] - min]++;
    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        if (visualizeStep) steps.push([...output]);
    }
    for (let i = 0; i < n; i++) arr[i] = output[i];
    if (visualizeStep) steps.push([...arr]);
    return steps;
}`,
      time: "Best: O(n + k), Average: O(n + k), Worst: O(n + k)",
      space: "O(k)"
    }
  };

  // --- AI Time Complexity Analysis ---
  function analyzeTimeComplexity(algoKey, arr) {
    const n = arr.length;
    const unique = new Set(arr).size;
    const isSorted = arr.every((v, i, a) => i === 0 || a[i - 1] <= v);
    const isReverse = arr.every((v, i, a) => i === 0 || a[i - 1] >= v);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    // Calculate actual operations for this specific array
    let actualOperations = calculateActualOperations(algoKey, arr);

         let analysis = `<div style="font-family: 'Courier New', monospace; line-height: 1.6; color: #000;">`;
    
    // Algorithm-specific analysis
    switch(algoKey) {
      case 'bubbleSort':
        analysis += `<strong>🔍 Bubble Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Outer loop: for (let i = 0; i < n - 1; i++) → O(n)<br>`;
        analysis += `• Inner loop: for (let j = 0; j < n - i - 1; j++) → O(n-i)<br>`;
        analysis += `• Total iterations: Σ(n-i) from i=0 to n-2 = n(n-1)/2<br><br>`;
        
        if (isSorted) {
          analysis += `<strong>🎯 Best Case (Already Sorted):</strong><br>`;
          analysis += `• No swaps needed → O(n) comparisons<br>`;
          analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n)</span><br><br>`;
        } else if (isReverse) {
          analysis += `<strong>⚠️ Worst Case (Reverse Sorted):</strong><br>`;
          analysis += `• Every comparison results in a swap<br>`;
          analysis += `• Total swaps: n(n-1)/2<br>`;
          analysis += `• Time Complexity: <span style="color: #ef4444; font-weight: bold;">O(n²)</span><br><br>`;
        } else {
          analysis += `<strong>📊 Average Case (Random Data):</strong><br>`;
          analysis += `• Approximately n(n-1)/4 swaps on average<br>`;
          analysis += `• Time Complexity: <span style="color: #f59e0b; font-weight: bold;">O(n²)</span><br><br>`;
        }
        break;

      case 'selectionSort':
        analysis += `<strong>🔍 Selection Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Outer loop: for (let i = 0; i < n - 1; i++) → O(n)<br>`;
        analysis += `• Inner loop: for (let j = i + 1; j < n; j++) → O(n-i)<br>`;
        analysis += `• Total comparisons: Σ(n-i) from i=0 to n-2 = n(n-1)/2<br><br>`;
        
        analysis += `<strong>📊 All Cases (Best/Average/Worst):</strong><br>`;
        analysis += `• Always performs the same number of comparisons<br>`;
        analysis += `• Swaps: O(n) (at most n-1 swaps)<br>`;
        analysis += `• Time Complexity: <span style="color: #f59e0b; font-weight: bold;">O(n²)</span><br><br>`;
        break;

      case 'insertionSort':
        analysis += `<strong>🔍 Insertion Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Outer loop: for (let i = 1; i < n; i++) → O(n)<br>`;
        analysis += `• Inner while loop: while (j >= 0 && arr[j] > key) → O(i) in worst case<br><br>`;
        
        if (isSorted) {
          analysis += `<strong>🎯 Best Case (Already Sorted):</strong><br>`;
          analysis += `• Inner loop never executes (arr[j] ≤ key always)<br>`;
          analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n)</span><br><br>`;
        } else if (isReverse) {
          analysis += `<strong>⚠️ Worst Case (Reverse Sorted):</strong><br>`;
          analysis += `• Inner loop executes i times for each i<br>`;
          analysis += `• Total: Σ(i) from i=1 to n-1 = n(n-1)/2<br>`;
          analysis += `• Time Complexity: <span style="color: #ef4444; font-weight: bold;">O(n²)</span><br><br>`;
        } else {
          analysis += `<strong>📊 Average Case (Random Data):</strong><br>`;
          analysis += `• Inner loop executes approximately i/2 times on average<br>`;
          analysis += `• Time Complexity: <span style="color: #f59e0b; font-weight: bold;">O(n²)</span><br><br>`;
        }
        break;

      case 'mergeSort':
        analysis += `<strong>🔍 Merge Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Recursive divide: log₂(n) levels<br>`;
        analysis += `• Merge operation: O(n) at each level<br>`;
        analysis += `• Total: log₂(n) × O(n) = O(n log n)<br><br>`;
        
        analysis += `<strong>📊 All Cases (Best/Average/Worst):</strong><br>`;
        analysis += `• Divide step: O(log n)<br>`;
        analysis += `• Merge step: O(n) at each level<br>`;
        analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n log n)</span><br><br>`;
        break;

      case 'quickSort':
        analysis += `<strong>🔍 Quick Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Partition: O(n) per call<br>`;
        analysis += `• Recursive calls: depends on pivot choice<br><br>`;
        
        if (isSorted || isReverse) {
          analysis += `<strong>⚠️ Worst Case (Sorted/Reverse Sorted):</strong><br>`;
          analysis += `• Pivot always at end → unbalanced partitions<br>`;
          analysis += `• One partition empty, other has n-1 elements<br>`;
          analysis += `• Time Complexity: <span style="color: #ef4444; font-weight: bold;">O(n²)</span><br><br>`;
        } else {
          analysis += `<strong>📊 Average Case (Random Data):</strong><br>`;
          analysis += `• Balanced partitions on average<br>`;
          analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n log n)</span><br><br>`;
        }
        analysis += `<strong>🎯 Best Case:</strong><br>`;
        analysis += `• Perfectly balanced partitions<br>`;
        analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n log n)</span><br><br>`;
        break;

      case 'heapSort':
        analysis += `<strong>🔍 Heap Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Build heap: O(n)<br>`;
        analysis += `• Extract max n times: O(log n) each<br>`;
        analysis += `• Total: O(n) + n × O(log n) = O(n log n)<br><br>`;
        
        analysis += `<strong>📊 All Cases (Best/Average/Worst):</strong><br>`;
        analysis += `• Heapify: O(n)<br>`;
        analysis += `• Extract and heapify: O(n log n)<br>`;
        analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n log n)</span><br><br>`;
        break;

      case 'countingSort':
        analysis += `<strong>🔍 Counting Sort Analysis for [${arr.join(', ')}]:</strong><br><br>`;
        analysis += `<strong>Code Structure:</strong><br>`;
        analysis += `• Count frequencies: O(n)<br>`;
        analysis += `• Cumulative count: O(k) where k = range<br>`;
        analysis += `• Reconstruct: O(n)<br>`;
        analysis += `• Total: O(n + k)<br><br>`;
        
        analysis += `<strong>📊 All Cases (Best/Average/Worst):</strong><br>`;
        analysis += `• Range k = ${range} (from ${min} to ${max})<br>`;
        analysis += `• Time Complexity: <span style="color: #10b981; font-weight: bold;">O(n + k)</span><br>`;
        analysis += `• Space Complexity: O(k)<br><br>`;
        break;
    }

    // Add mathematical derivation
    analysis += `<strong>🧮 Mathematical Derivation:</strong><br>`;
    switch(algoKey) {
      case 'bubbleSort':
        analysis += `• Total iterations: Σ(n-i) from i=0 to n-2<br>`;
        analysis += `• = (n-1) + (n-2) + ... + 1<br>`;
        analysis += `• = n(n-1)/2 = (n²-n)/2<br>`;
        analysis += `• Therefore: O(n²)<br><br>`;
        break;
      case 'selectionSort':
        analysis += `• Total comparisons: Σ(n-i) from i=0 to n-2<br>`;
        analysis += `• = (n-1) + (n-2) + ... + 1<br>`;
        analysis += `• = n(n-1)/2 = (n²-n)/2<br>`;
        analysis += `• Therefore: O(n²)<br><br>`;
        break;
      case 'insertionSort':
        analysis += `• Worst case: Σ(i) from i=1 to n-1<br>`;
        analysis += `• = 1 + 2 + ... + (n-1)<br>`;
        analysis += `• = n(n-1)/2 = (n²-n)/2<br>`;
        analysis += `• Therefore: O(n²)<br><br>`;
        break;
      case 'mergeSort':
        analysis += `• Recursion tree: log₂(n) levels<br>`;
        analysis += `• Work at each level: O(n)<br>`;
        analysis += `• Total: log₂(n) × O(n) = O(n log n)<br><br>`;
        break;
      case 'quickSort':
        analysis += `• Average case: Balanced partitions<br>`;
        analysis += `• Recursion depth: log₂(n)<br>`;
        analysis += `• Work at each level: O(n)<br>`;
        analysis += `• Total: O(n log n)<br><br>`;
        break;
      case 'heapSort':
        analysis += `• Build heap: O(n)<br>`;
        analysis += `• Extract n times: n × O(log n)<br>`;
        analysis += `• Total: O(n) + O(n log n) = O(n log n)<br><br>`;
        break;
      case 'countingSort':
        analysis += `• Count frequencies: O(n)<br>`;
        analysis += `• Cumulative count: O(k)<br>`;
        analysis += `• Reconstruct: O(n)<br>`;
        analysis += `• Total: O(n + k)<br><br>`;
        break;
    }

    // Add practical insights
    analysis += `<strong>💡 Practical Insights:</strong><br>`;
    analysis += `• Array size: ${n} elements<br>`;
    analysis += `• Unique values: ${unique} (${((unique/n)*100).toFixed(1)}% unique)<br>`;
    analysis += `• Data characteristics: ${isSorted ? 'Already sorted' : isReverse ? 'Reverse sorted' : 'Random data'}<br>`;
    
    if (n <= 10) {
      analysis += `• For small arrays (≤10), simple algorithms like Insertion Sort may be faster<br>`;
    } else if (n > 50) {
      analysis += `• For larger arrays (>50), consider O(n log n) algorithms like Merge Sort or Quick Sort<br>`;
    }
    
    if (unique <= n/2) {
      analysis += `• Many duplicate values detected - Counting Sort would be very efficient<br>`;
    }

    // Add actual operations performed
    analysis += `<strong>🔢 Actual Operations for This Array:</strong><br>`;
    analysis += `• Comparisons: ${actualOperations.comparisons}<br>`;
    analysis += `• Swaps/Assignments: ${actualOperations.swaps}<br>`;
    analysis += `• Total operations: ${actualOperations.total}<br>`;
    analysis += `• Theoretical max: ${actualOperations.theoreticalMax}<br>`;
    analysis += `• Efficiency: ${((actualOperations.theoreticalMax - actualOperations.total) / actualOperations.theoreticalMax * 100).toFixed(1)}% better than worst case<br><br>`;

    // Add performance indicator
    const efficiency = ((actualOperations.theoreticalMax - actualOperations.total) / actualOperations.theoreticalMax * 100);
    let performanceColor = '#ef4444'; // Red for poor
    let performanceText = 'Poor';
    if (efficiency > 70) {
      performanceColor = '#10b981'; // Green for excellent
      performanceText = 'Excellent';
    } else if (efficiency > 40) {
      performanceColor = '#f59e0b'; // Yellow for good
      performanceText = 'Good';
    } else if (efficiency > 10) {
      performanceColor = '#3b82f6'; // Blue for fair
      performanceText = 'Fair';
    }

    analysis += `<strong>📈 Performance Indicator:</strong><br>`;
    analysis += `<span style="color: ${performanceColor}; font-weight: bold;">${performanceText}</span> - This algorithm is performing ${efficiency.toFixed(1)}% better than its worst-case scenario.<br><br>`;

    analysis += `</div>`;
    return analysis;
  }

  // Calculate actual operations performed by the algorithm
  function calculateActualOperations(algoKey, arr) {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;

    // Create a copy to avoid modifying the original
    const arrCopy = arr.slice();

    switch(algoKey) {
      case 'bubbleSort':
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (arrCopy[j] > arrCopy[j + 1]) {
              [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
              swaps++;
            }
          }
        }
        break;

      case 'selectionSort':
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arrCopy[j] < arrCopy[minIdx]) minIdx = j;
          }
          if (minIdx !== i) {
            [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
            swaps++;
          }
        }
        break;

      case 'insertionSort':
        for (let i = 1; i < n; i++) {
          let key = arrCopy[i];
          let j = i - 1;
          while (j >= 0 && arrCopy[j] > key) {
            comparisons++;
            arrCopy[j + 1] = arrCopy[j];
            swaps++;
            j--;
          }
          if (j >= 0) comparisons++; // Last comparison that failed
          arrCopy[j + 1] = key;
          swaps++;
        }
        break;

      case 'mergeSort':
        // Simplified calculation for merge sort
        comparisons = Math.floor(n * Math.log2(n));
        swaps = n * Math.log2(n);
        break;

      case 'quickSort':
        // Simplified calculation for quick sort
        comparisons = Math.floor(n * Math.log2(n));
        swaps = Math.floor(n * Math.log2(n));
        break;

      case 'heapSort':
        // Simplified calculation for heap sort
        comparisons = Math.floor(n * Math.log2(n));
        swaps = Math.floor(n * Math.log2(n));
        break;

      case 'countingSort':
        comparisons = n;
        swaps = n;
        break;
    }

    const total = comparisons + swaps;
    const theoreticalMax = n * n; // O(n²) for most algorithms

    return {
      comparisons,
      swaps,
      total,
      theoreticalMax
    };
  }

  // Generate comparison chart for all algorithms
  function generateAlgorithmComparison(arr) {
    const comparisonChart = document.getElementById('comparison-chart');
    if (!comparisonChart) return;

    const algorithms = ['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort', 'heapSort', 'countingSort'];
    const results = [];

    algorithms.forEach(algoKey => {
      const operations = calculateActualOperations(algoKey, arr);
      results.push({
        algorithm: ALGORITHMS[algoKey].name,
        total: operations.total,
        comparisons: operations.comparisons,
        swaps: operations.swaps
      });
    });

    // Sort by total operations (best to worst)
    results.sort((a, b) => a.total - b.total);

    const chartHTML = `
      <div style="font-family: 'Courier New', monospace; font-size: 14px;">
        <div style="margin-bottom: 15px; font-weight: bold; color: #0ea5e9;">
          Performance Ranking (Best to Worst) for [${arr.join(', ')}]:
        </div>
        ${results.map((result, index) => `
          <div style="display: flex; align-items: center; margin-bottom: 8px; padding: 8px; background: ${index === 0 ? 'rgba(16, 185, 129, 0.1)' : index === 1 ? 'rgba(59, 130, 246, 0.1)' : index === 2 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border-radius: 6px;">
            <div style="width: 30px; text-align: center; font-weight: bold; color: ${index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : '#ef4444'};">#${index + 1}</div>
            <div style="flex: 1; font-weight: bold;">${result.algorithm}</div>
            <div style="width: 80px; text-align: right;">${result.total} ops</div>
            <div style="width: 100px; text-align: right; font-size: 12px; color: #6b7280;">
              (${result.comparisons} comp, ${result.swaps} swaps)
            </div>
          </div>
        `).join('')}
        <div style="margin-top: 15px; font-size: 12px; color: #6b7280;">
          💡 <strong>Insight:</strong> ${results[0].algorithm} performed best with ${results[0].total} operations, 
          while ${results[results.length-1].algorithm} required ${results[results.length-1].total} operations 
          (${((results[results.length-1].total / results[0].total) - 1) * 100}% more operations).
        </div>
      </div>
    `;

    comparisonChart.innerHTML = chartHTML;
  }

  // --- AI Recommendation and Explanation ---
  function recommendAlgorithm(arr) {
    const unique = new Set(arr).size;
    const isSorted = arr.every((v, i, a) => i === 0 || a[i - 1] <= v);
    const isReverse = arr.every((v, i, a) => i === 0 || a[i - 1] >= v);

    if (arr.length <= 5) return 'insertionSort';
    if (isSorted) return 'insertionSort';
    if (isReverse) return 'bubbleSort';
    if (unique <= arr.length / 2) return 'countingSort';
    if (arr.length > 100) return 'mergeSort';
    return 'quickSort';
  }
  function aiExplanation(algoKey, arr) {
    const algoNames = {
      bubbleSort: "Bubble Sort",
      selectionSort: "Selection Sort",
      insertionSort: "Insertion Sort",
      mergeSort: "Merge Sort",
      quickSort: "Quick Sort",
      heapSort: "Heap Sort",
      countingSort: "Counting Sort"
    };
    if (algoKey === 'insertionSort' && arr.length <= 10)
      return "Insertion Sort is recommended for small arrays because it is simple and efficient for nearly sorted or small datasets.";
    if (algoKey === 'countingSort')
      return "Counting Sort is recommended when there are many repeated values, as in your array, making it very efficient.";
    if (algoKey === 'mergeSort')
      return "Merge Sort is recommended for large arrays due to its consistent O(n log n) performance.";
    if (algoKey === 'quickSort')
      return "Quick Sort is a good general-purpose algorithm for random data and is usually faster than other sorts for medium-sized arrays.";
    if (algoKey === 'bubbleSort' && arr.every((v, i, a) => i === 0 || a[i - 1] >= v))
      return "Bubble Sort is chosen because your array is reverse sorted, and Bubble Sort will quickly move the largest elements to the end.";
    return `You selected ${algoNames[algoKey]}. This algorithm is suitable for your array based on its size and characteristics.`;
  }
  // Create AI block if not present
  let aiBlock = document.getElementById('ai-block');
  if (!aiBlock) {
    aiBlock = document.createElement('div');
    aiBlock.id = 'ai-block';
    aiBlock.style.margin = '10px 0';
    aiBlock.style.padding = '10px';
    aiBlock.style.background = 'rgba(0,212,255,0.07)';
    aiBlock.style.borderRadius = '8px';
    aiBlock.style.fontWeight = 'bold';
    const form = document.getElementById('sort-form');
    form.parentNode.insertBefore(aiBlock, form.nextSibling);
  }

  // --- Step-by-step code explanation ---
  function generateStepByStepExplanation(algoKey, arr, steps) {
    if (!steps || steps.length === 0) return "No steps to explain for this input.";

    let explanation = `Step-by-step explanation for ${ALGORITHMS[algoKey].name} on [${arr.join(', ')}]:\n\n`;
    let prev = arr.slice();
    steps.forEach((step, idx) => {
      let changed = [];
      for (let i = 0; i < step.length; i++) {
        if (step[i] !== prev[i]) changed.push(i);
      }
      if (changed.length > 0) {
        explanation += `Step ${idx + 1}: `;
        if (algoKey === "bubbleSort" || algoKey === "selectionSort" || algoKey === "insertionSort") {
          explanation += `Swapped/shifted elements at positions ${changed.join(' & ')}. `;
        } else if (algoKey === "mergeSort") {
          explanation += `Merged subarrays, changed positions ${changed.join(', ')}. `;
        } else if (algoKey === "quickSort") {
          explanation += `Partitioned around pivot, changed positions ${changed.join(', ')}. `;
        } else if (algoKey === "heapSort") {
          explanation += `Heapified or swapped elements at positions ${changed.join(' & ')}. `;
        } else if (algoKey === "countingSort") {
          explanation += `Placed value(s) at position(s) ${changed.join(', ')} in output array. `;
        }
        explanation += `Array now: [${step.join(', ')}]\n`;
      }
      prev = step.slice();
    });
    return explanation;
  }

  // --- Show step-by-step explanation in the UI ---
  let stepBlock = document.getElementById('step-explanation-block');

  // --- DOM Elements ---
  const form = document.getElementById('sort-form');
  const input = document.getElementById('array-input');
  const algoSelect = document.getElementById('algo-select');
  const codeBlock = document.getElementById('code-block');
  const algoInfo = document.getElementById('algo-info');
  let chartOriginal = null;
  let chartSorted = null;

  // --- Main form submit handler ---
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const arr = input.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    if (!arr.length) {
      alert('Please enter a valid array of numbers');
      return;
    }

    // --- AI Recommendation and Explanation ---
    const recommended = recommendAlgorithm(arr);
    const recommendedName = ALGORITHMS[recommended].name;
    const selectedAlgo = algoSelect.value;
    aiBlock.innerHTML = `
      <div style="color:#0ea5e9;">🤖 <b>AI Recommendation:</b> <span style="color:#22d3ee">${recommendedName}</span></div>
      <div style="margin-top:4px;color:#38bdf8;">${aiExplanation(selectedAlgo, arr)}</div>
    `;

    const algo = ALGORITHMS[selectedAlgo];
    const arrCopy = arr.slice();
    // --- Generate steps for explanation ---
    const steps = algo.func(arr.slice(), true);
    // --- Show step-by-step explanation ---
    stepBlock.textContent = generateStepByStepExplanation(selectedAlgo, arr, steps);

    algo.func(arrCopy, false); // Sort in-place for output
    const sorted = arrCopy;

    // Destroy existing charts
    if (chartOriginal) chartOriginal.destroy();
    if (chartSorted) chartSorted.destroy();

    // Draw original array
    const ctxOriginal = document.getElementById('bar-chart-original').getContext('2d');
    chartOriginal = new Chart(ctxOriginal, {
      type: 'bar',
      data: {
        labels: arr.map(String),
        datasets: [{
          label: 'Original',
          data: arr,
          backgroundColor: '#fbbf24',
          borderColor: '#f59e42',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: 'Index' }, ticks: { color: '#374151' } },
          y: { beginAtZero: true, title: { display: true, text: 'Value' }, ticks: { color: '#374151' } }
        }
      }
    });

    // Draw sorted array
    const ctxSorted = document.getElementById('bar-chart-sorted').getContext('2d');
    chartSorted = new Chart(ctxSorted, {
      type: 'bar',
      data: {
        labels: sorted.map(String),
        datasets: [{
          label: 'Sorted',
          data: sorted,
          backgroundColor: '#60a5fa',
          borderColor: '#3b82f6',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: 'Index' }, ticks: { color: '#374151' } },
          y: { beginAtZero: true, title: { display: true, text: 'Value' }, ticks: { color: '#374151' } }
        }
      }
    });

    // Show algorithm info
    algoInfo.innerHTML = `
      <strong>${algo.name}</strong>
      <div><strong>Definition:</strong> ${algo.definition}</div>
      <div><strong>Logic:</strong> ${algo.logic}</div>
      <div class="example">
        <strong>Example:</strong><br>
        Input: [${algo.example.input.join(', ')}]<br>
        Output: [${algo.example.output.join(', ')}]
      </div>
    `;

    // Show time and space complexity
    document.getElementById('complexity-info').innerHTML = `
      <strong>Time Complexity:</strong> ${algo.time}<br>
      <strong>Space Complexity:</strong> ${algo.space}
    `;

    // Show AI-powered time complexity analysis
    const aiComplexityContent = document.getElementById('ai-complexity-content');
    if (aiComplexityContent) {
      aiComplexityContent.innerHTML = analyzeTimeComplexity(selectedAlgo, arr);
    }

    // Generate algorithm comparison chart
    generateAlgorithmComparison(arr);

    // Show code
    codeBlock.textContent =
`// Input array
let arr = [${arr.join(', ')}];

// Sorting using ${algo.name}
${algo.code}

// Call the function to sort
${selectedAlgo}(arr, false);

console.log("Sorted array:", arr);`;

    // --- Gamification logic ---
    // Track used algorithms for badge
    if (!usedAlgos.includes(selectedAlgo)) {
      usedAlgos.push(selectedAlgo);
      localStorage.setItem('used_algos', JSON.stringify(usedAlgos));
    }
    // Award All Algorithms badge
    if (!badges.allAlgos && usedAlgos.length === Object.keys(ALGORITHMS).length) {
      badges.allAlgos = true;
    }
    // Award Big Array badge
    if (!badges.bigArray && arr.length >= 50) {
      badges.bigArray = true;
    }
    // Award Complexity Learner badge (if user scrolls to or clicks complexity-info)
    document.getElementById('complexity-info').onclick = function() {
      if (!badges.complexityLearner) {
        badges.complexityLearner = true;
        saveBadges(badges);
        renderBadges(badges);
      }
    };
    // Award Challenge Winner badge
    if (
      currentChallenge &&
      arr.join(',') === currentChallenge.array.join(',') &&
      (!currentChallenge.algo || selectedAlgo === currentChallenge.algo) &&
      steps.length <= currentChallenge.maxSteps
    ) {
      badges.challengeWinner = true;
      setTimeout(() => {
        const difficulty = currentChallenge.difficulty;
        const message = `🎉 Challenge completed! You successfully completed the ${difficulty} challenge using ${ALGORITHMS[selectedAlgo].name}! You earned the Challenge Winner badge!`;
        alert(message);
      }, 200);
    } else if (currentChallenge && arr.join(',') === currentChallenge.array.join(',') && selectedAlgo === currentChallenge.algo) {
      // Challenge attempted but too many steps
      setTimeout(() => {
        const message = `⚠️ Challenge attempted! You used the correct algorithm but took ${steps.length} steps (max allowed: ${currentChallenge.maxSteps}). Try to be more efficient!`;
        alert(message);
      }, 200);
    } else if (currentChallenge && arr.join(',') === currentChallenge.array.join(',') && currentChallenge.algo && selectedAlgo !== currentChallenge.algo) {
      // Wrong algorithm used
      setTimeout(() => {
        const message = `⚠️ Challenge attempted! You used ${ALGORITHMS[selectedAlgo].name} but the challenge required ${ALGORITHMS[currentChallenge.algo].name}. Try again with the correct algorithm!`;
        alert(message);
      }, 200);
    }
    saveBadges(badges);
    renderBadges(badges);
  });

  // --- Copy code button functionality ---
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', function() {
      const code = codeBlock.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Code', 1200);
        alert('Copied');
      });
    });
  }

  // --- GIF Export Logic ---
  const downloadGifBtn = document.getElementById('download-gif-btn');
  if (downloadGifBtn) {
    downloadGifBtn.addEventListener('click', async function() {
      const arr = input.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
      if (!arr.length) {
        alert('Please enter a valid array of numbers');
        return;
      }
      const selectedAlgo = algoSelect.value;
      const algo = ALGORITHMS[selectedAlgo];
      const steps = algo.func(arr.slice(), true);

      if (!steps.length) {
        alert('No steps to visualize!');
        return;
      }

      downloadGifBtn.textContent = "Generating GIF...";
      downloadGifBtn.disabled = true;

      // Show progress indicator
      const progressDiv = document.getElementById('gif-progress');
      const progressText = document.getElementById('gif-progress-text');
      progressDiv.style.display = 'block';

      try {
                 // Create a smaller canvas for ultra-fast processing
         const gifCanvas = document.createElement('canvas');
         gifCanvas.width = 300; // Smaller width
         gifCanvas.height = 150; // Smaller height
         const gifCtx = gifCanvas.getContext('2d');

        // Check if GIF.js is available
        if (typeof GIF === 'undefined') {
          throw new Error('GIF.js library not loaded. Please refresh the page and try again.');
        }

                 // Ultra-fast GIF settings
         const gif = new GIF({
           workers: 1, // Single worker for fastest processing
           quality: 5, // Lower quality for speed
           width: gifCanvas.width,
           height: gifCanvas.height,
           dither: false,
           transparent: null,
           background: '#ffffff' // White background for faster rendering
         });

         // Drastically reduce frames for speed (max 8 frames)
         const stepInterval = Math.max(1, Math.floor(steps.length / 8));
         const sampledSteps = steps.filter((_, index) => index % stepInterval === 0);
         
         // Only add first and last if we have space
         if (sampledSteps.length < 8) {
           if (sampledSteps[0] !== steps[0]) sampledSteps.unshift(steps[0]);
           if (sampledSteps[sampledSteps.length - 1] !== steps[steps.length - 1]) {
             sampledSteps.push(steps[steps.length - 1]);
           }
         }

        progressText.textContent = `Processing ${sampledSteps.length} frames from ${steps.length} total steps...`;

                 // Generate frames as fast as possible
         for (let i = 0; i < sampledSteps.length; i++) {
           const step = sampledSteps[i];
           
           // Update progress
           const progress = Math.round(((i + 1) / sampledSteps.length) * 100);
           progressText.textContent = `Processing frame ${i + 1} of ${sampledSteps.length} (${progress}%)`;
           
           // Clear canvas
           gifCtx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);
           
           // Draw simplified bars for speed
           const barWidth = gifCanvas.width / step.length;
           const maxValue = Math.max(...step);
           const scale = (gifCanvas.height - 20) / maxValue;
           
           // Draw bars without text for speed
           step.forEach((value, index) => {
             const barHeight = value * scale;
             const x = index * barWidth;
             const y = gifCanvas.height - barHeight - 10;
             
             gifCtx.fillStyle = '#60a5fa';
             gifCtx.fillRect(x + 1, y, barWidth - 2, barHeight);
           });
           
           // Add frame to GIF with minimal delay
           gif.addFrame(gifCanvas, {
             copy: true, 
             delay: 200 // Faster animation
           });
           
           // No delay for maximum speed
         }

        progressText.textContent = 'Finalizing GIF...';

        // Generate GIF with better error handling
        gif.on('finished', function(blob) {
          try {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sorting_${selectedAlgo}_${arr.length}elements.gif`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Hide progress and reset button
            progressDiv.style.display = 'none';
            downloadGifBtn.textContent = "Download GIF";
            downloadGifBtn.disabled = false;
            
            // Show success message
            setTimeout(() => {
              alert('GIF downloaded successfully!');
            }, 100);
          } catch (downloadError) {
            console.error('Download error:', downloadError);
            progressDiv.style.display = 'none';
            downloadGifBtn.textContent = "Download GIF";
            downloadGifBtn.disabled = false;
            alert('Download failed. Please try again or check your browser settings.');
          }
        });

        gif.on('error', function(error) {
          console.error('GIF generation error:', error);
          progressDiv.style.display = 'none';
          downloadGifBtn.textContent = "Download GIF";
          downloadGifBtn.disabled = false;
          alert('GIF generation failed. Please try again with a smaller array.');
        });

        gif.render();

      } catch (error) {
        console.error('GIF generation error:', error);
        progressDiv.style.display = 'none';
        downloadGifBtn.textContent = "Download GIF";
        downloadGifBtn.disabled = false;
        alert(`GIF generation failed: ${error.message}. Please try again.`);
      }
    });
  }

  // --- Gamification: Challenges & Achievements ---

  // Add challenge and badge UI
  let gamifyBlock = document.getElementById('gamify-block');
  if (!gamifyBlock) {
    gamifyBlock = document.createElement('div');
    gamifyBlock.id = 'gamify-block';
    gamifyBlock.style.margin = '10px 0 18px 0';
    gamifyBlock.style.padding = '14px';
    gamifyBlock.style.background = '#fff7fa';
    gamifyBlock.style.borderRadius = '12px';
    gamifyBlock.style.boxShadow = '0 2px 12px rgba(255,127,163,0.07)';
    gamifyBlock.style.fontWeight = 'bold';
    gamifyBlock.style.color = '#b83260';
    gamifyBlock.innerHTML = `
      <h2 style="color:#b83260; margin:0 0 8px 0; font-size:1.2rem;">🎯 Sorting Challenge</h2>
      <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">
        Complete challenges to earn badges! Select the challenge array and algorithm, then click "Sort Array".
      </div>
      <div id="challenge-text"></div>
      <div id="challenge-hint" style="font-size: 0.85rem; color: #888; margin-top: 5px; font-style: italic;"></div>
      <button id="new-challenge-btn" style="margin:8px 0 0 0; padding:6px 16px; border-radius:8px; background:#ff7fa3; color:#fff; border:none; font-weight:700; cursor:pointer;">New Challenge</button>
      <div id="badge-area" style="margin-top:16px;"></div>
    `;
    const form = document.getElementById('sort-form');
    form.parentNode.insertBefore(gamifyBlock, form);
  }

  // --- Challenge logic ---
  const challengeText = document.getElementById('challenge-text');
  const challengeHint = document.getElementById('challenge-hint');
  const newChallengeBtn = document.getElementById('new-challenge-btn');
  const badgeArea = document.getElementById('badge-area');

  const challengeTypes = [
    // Simple challenges that are easy to understand
    () => {
      // Easy: Small array, any algorithm
      let arr = [3, 1, 4, 1, 5];
      return {
        desc: `🎯 Easy Challenge: Sort [${arr.join(', ')}] using any algorithm!`,
        array: arr,
        algo: null,
        maxSteps: 10,
        difficulty: 'Easy'
      };
    },
    () => {
      // Medium: Use Bubble Sort
      let arr = [5, 2, 8, 1, 9];
      return {
        desc: `🎯 Medium Challenge: Sort [${arr.join(', ')}] using Bubble Sort!`,
        array: arr,
        algo: 'bubbleSort',
        maxSteps: 15,
        difficulty: 'Medium'
      };
    },
    () => {
      // Medium: Use Insertion Sort
      let arr = [7, 3, 9, 2, 6];
      return {
        desc: `🎯 Medium Challenge: Sort [${arr.join(', ')}] using Insertion Sort!`,
        array: arr,
        algo: 'insertionSort',
        maxSteps: 12,
        difficulty: 'Medium'
      };
    },
    () => {
      // Hard: Use Merge Sort
      let arr = [8, 4, 2, 7, 1, 9, 3, 6];
      return {
        desc: `🎯 Hard Challenge: Sort [${arr.join(', ')}] using Merge Sort!`,
        array: arr,
        algo: 'mergeSort',
        maxSteps: 25,
        difficulty: 'Hard'
      };
    },
    () => {
      // Special: Counting Sort with duplicates
      let arr = [2, 2, 1, 3, 1, 2];
      return {
        desc: `🎯 Special Challenge: Sort [${arr.join(', ')}] using Counting Sort! (Many duplicates)`,
        array: arr,
        algo: 'countingSort',
        maxSteps: 8,
        difficulty: 'Special'
      };
    }
  ];

  let currentChallenge = null;
  function setNewChallenge() {
    currentChallenge = challengeTypes[Math.floor(Math.random() * challengeTypes.length)]();
    challengeText.textContent = currentChallenge.desc;
    
    // Add helpful hint based on challenge type
    let hint = '';
    switch(currentChallenge.difficulty) {
      case 'Easy':
        hint = '💡 Tip: Try any algorithm you like!';
        break;
      case 'Medium':
        hint = '💡 Tip: Make sure to select the correct algorithm from the dropdown.';
        break;
      case 'Hard':
        hint = '💡 Tip: This is a larger array, so it might take more steps.';
        break;
      case 'Special':
        hint = '💡 Tip: Counting Sort works great with duplicate values!';
        break;
    }
    challengeHint.textContent = hint;
    
    // Pre-fill form
    document.getElementById('array-input').value = currentChallenge.array.join(', ');
    if (currentChallenge.algo) document.getElementById('algo-select').value = currentChallenge.algo;
  }
  newChallengeBtn.onclick = setNewChallenge;
  setNewChallenge();

  // --- Achievements/Badges logic ---
  function getBadges() {
    // Use localStorage to persist badges
    let badges = localStorage.getItem('sorting_badges');
    if (badges) return JSON.parse(badges);
    return {
      allAlgos: false,
      bigArray: false,
      complexityLearner: false,
      challengeWinner: false
    };
  }
  function saveBadges(badges) {
    localStorage.setItem('sorting_badges', JSON.stringify(badges));
  }
  function renderBadges(badges) {
    badgeArea.innerHTML = `
      <h3 style="margin:0 0 8px 0; color:#b83260; font-size:1.1rem;">🏅 Achievements</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <span title="Use all 7 sorting algorithms" style="padding: 4px 8px; background: ${badges.allAlgos ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.1)'}; border-radius: 6px; font-size: 0.85rem; opacity:${badges.allAlgos?1:0.5};">🧩 All Algorithms</span>
        <span title="Sort an array with 50+ elements" style="padding: 4px 8px; background: ${badges.bigArray ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.1)'}; border-radius: 6px; font-size: 0.85rem; opacity:${badges.bigArray?1:0.5};">🔢 Big Array</span>
        <span title="Learn about time complexity" style="padding: 4px 8px; background: ${badges.complexityLearner ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.1)'}; border-radius: 6px; font-size: 0.85rem; opacity:${badges.complexityLearner?1:0.5};">📚 Complexity Learner</span>
        <span title="Complete a sorting challenge" style="padding: 4px 8px; background: ${badges.challengeWinner ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.1)'}; border-radius: 6px; font-size: 0.85rem; opacity:${badges.challengeWinner?1:0.5};">🏆 Challenge Winner</span>
      </div>
    `;
  }
  let badges = getBadges();
  renderBadges(badges);

  // --- Track which algorithms have been used ---
  let usedAlgos = JSON.parse(localStorage.getItem('used_algos') || '[]');

  // --- Gamification logic (integrated into main form handler) ---
  // Track used algorithms for badge
  if (!usedAlgos.includes(selectedAlgo)) {
    usedAlgos.push(selectedAlgo);
    localStorage.setItem('used_algos', JSON.stringify(usedAlgos));
  }
  // Award All Algorithms badge
  if (!badges.allAlgos && usedAlgos.length === Object.keys(ALGORITHMS).length) {
    badges.allAlgos = true;
  }
  // Award Big Array badge
  if (!badges.bigArray && arr.length >= 50) {
    badges.bigArray = true;
  }
  // Award Complexity Learner badge (if user scrolls to or clicks complexity-info)
  document.getElementById('complexity-info').onclick = function() {
    if (!badges.complexityLearner) {
      badges.complexityLearner = true;
      saveBadges(badges);
      renderBadges(badges);
    }
  };
  // Award Challenge Winner badge
  if (
    currentChallenge &&
    arr.join(',') === currentChallenge.array.join(',') &&
    (!currentChallenge.algo || selectedAlgo === currentChallenge.algo) &&
    steps.length <= currentChallenge.maxSteps
  ) {
    badges.challengeWinner = true;
    setTimeout(() => {
      const difficulty = currentChallenge.difficulty;
      const message = `🎉 Challenge completed! You successfully completed the ${difficulty} challenge using ${ALGORITHMS[selectedAlgo].name}! You earned the Challenge Winner badge!`;
      alert(message);
    }, 200);
  } else if (currentChallenge && arr.join(',') === currentChallenge.array.join(',') && selectedAlgo === currentChallenge.algo) {
    // Challenge attempted but too many steps
    setTimeout(() => {
      const message = `⚠️ Challenge attempted! You used the correct algorithm but took ${steps.length} steps (max allowed: ${currentChallenge.maxSteps}). Try to be more efficient!`;
      alert(message);
    }, 200);
  } else if (currentChallenge && arr.join(',') === currentChallenge.array.join(',') && currentChallenge.algo && selectedAlgo !== currentChallenge.algo) {
    // Wrong algorithm used
    setTimeout(() => {
      const message = `⚠️ Challenge attempted! You used ${ALGORITHMS[selectedAlgo].name} but the challenge required ${ALGORITHMS[currentChallenge.algo].name}. Try again with the correct algorithm!`;
      alert(message);
    }, 200);
  }
  saveBadges(badges);
  renderBadges(badges);
});