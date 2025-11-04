// Test Bangladesh API responses
console.log('Testing Bangladesh API...\n');

// Test Divisions
fetch('https://bdapi.vercel.app/api/v.1/division')
  .then(res => res.json())
  .then(data => {
    console.log('✅ DIVISIONS API RESPONSE:');
    console.log('Type:', Array.isArray(data) ? 'Array' : typeof data);
    console.log('Has data property?', 'data' in data);
    console.log('First item:', JSON.stringify(data.data?.[0] || data[0], null, 2));
    console.log('Total count:', data.data?.length || data.length);
    console.log('\n');
  })
  .catch(err => console.error('❌ Divisions error:', err));

// Test Districts (all)
fetch('https://bdapi.vercel.app/api/v.1/district')
  .then(res => res.json())
  .then(data => {
    console.log('✅ DISTRICTS API RESPONSE (all):');
    console.log('Type:', Array.isArray(data) ? 'Array' : typeof data);
    console.log('Has data property?', 'data' in data);
    console.log('First item:', JSON.stringify(data.data?.[0] || data[0], null, 2));
    console.log('Total count:', data.data?.length || data.length);
    console.log('\n');
  })
  .catch(err => console.error('❌ Districts error:', err));

// Test Upazilas (all)
fetch('https://bdapi.vercel.app/api/v.1/upazila')
  .then(res => res.json())
  .then(data => {
    console.log('✅ UPAZILAS API RESPONSE (all):');
    console.log('Type:', Array.isArray(data) ? 'Array' : typeof data);
    console.log('Has data property?', 'data' in data);
    console.log('First item:', JSON.stringify(data.data?.[0] || data[0], null, 2));
    console.log('Total count:', data.data?.length || data.length);
    console.log('\n');
  })
  .catch(err => console.error('❌ Upazilas error:', err));

console.log('API tests initiated. Check responses above.');
