import pandas as pd
import json
import re
import os # Import the os module

def clean_and_parse_data(df):
    """
    Cleans and transforms the DataFrame from the CSV into a format suitable for the React app.
    """
    transformed_data = []

    # Define a mapping for cities to broader counties for consistency with app filters
    city_to_county_mapping = {
        'ancaster': 'Hamilton',
        'waterdown': 'Hamilton',
        'stoney creek': 'Hamilton',
        'dundas': 'Hamilton',
        'brampton': 'Peel Region',
        'mississauga': 'Peel Region',
        'milton': 'Halton Region',
        'burlington': 'Halton Region',
        'ottawa': 'Ottawa',
        'nepean': 'Ottawa',
        'etobicoke': 'Toronto',
        'scarborough': 'Toronto',
        'north york': 'Toronto',
        'east york': 'Toronto',
        'markham': 'York Region',
        'richmond hill': 'York Region',
        'woodbridge': 'York Region',
        'newmarket': 'York Region',
        'whitchurch-stouffville': 'York Region',
        'king city': 'York Region',
        'ajax': 'Durham Region',
        'pickering': 'Durham Region',
        'oshawa': 'Durham Region',
        'whitby': 'Durham Region',
        'bowmanville': 'Durham Region',
        'beaverton': 'Durham Region',
        'thunder bay': 'Thunder Bay District',
        'terrace bay': 'Thunder Bay District',
        'englehart': 'Timiskaming District',
        'kirkland lake': 'Timiskaming District',
        'temiskaming shores': 'Timiskaming District',
        'val caron': 'Sudbury District',
        'sudbury': 'Sudbury District',
        'azilda': 'Sudbury District',
        'chelmsford': 'Sudbury District',
        'blind river': 'Algoma District',
        'elliot lake': 'Algoma District',
        'sault ste. marie': 'Algoma District',
        'thessalon': 'Algoma District',
        'brantford': 'Brant County',
        'mount pleasant': 'Brant County',
        'ohsweken': 'Brant County',
        'paris': 'Brant County',
        'walkerton': 'Bruce County',
        'wiarton': 'Bruce County',
        'lion\'s head': 'Bruce County',
        'kincardine': 'Bruce County',
        'chesley': 'Bruce County',
        'tiverton': 'Bruce County',
        'blenheim': 'Chatham-Kent',
        'chatham': 'Chatham-Kent',
        'wallaceburg': 'Chatham-Kent',
        'ridgetown': 'Chatham-Kent',
        'tilbury': 'Chatham-Kent',
        'orangeville': 'Dufferin County',
        'shelburne': 'Dufferin County',
        'aylmer': 'Elgin County',
        'dutton': 'Elgin County',
        'st. thomas': 'Elgin County',
        'port stanley': 'Elgin County',
        'tillsonburg': 'Oxford County', # Tillsonburg is in Oxford County
        'windsor': 'Essex County',
        'tecumseh': 'Essex County',
        'south woodslee': 'Essex County',
        'leamington': 'Essex County',
        'essex': 'Essex County',
        'amherstburg': 'Essex County',
        'kingston': 'Frontenac County',
        'glenburnie': 'Frontenac County',
        'hanover': 'Grey County',
        'meaford': 'Grey County',
        'owen sound': 'Grey County',
        'markdale': 'Grey County',
        'durham': 'Grey County',
        'hagersville': 'Haldimand-Norfolk', # Hagersville is in Haldimand County
        'courtland': 'Haldimand-Norfolk', # Courtland is in Norfolk County
        'simcoe': 'Haldimand-Norfolk', # Simcoe is in Norfolk County
        'port dover': 'Haldimand-Norfolk', # Port Dover is in Norfolk County
        'dunnville': 'Haldimand-Norfolk', # Dunnville is in Haldimand County
        'townsend': 'Haldimand-Norfolk', # Townsend is in Norfolk County
        'georgetown': 'Halton Region',
        'oakville': 'Halton Region',
        'belleville': 'Hastings County',
        'marmora': 'Hastings County',
        'bancroft': 'Hastings County',
        'cannifton': 'Hastings County',
        'tweed': 'Hastings County',
        'zurich': 'Huron County',
        'wingham': 'Huron County',
        'exeter': 'Huron County',
        'fordwich': 'Huron County',
        'brussels': 'Huron County',
        'clinton': 'Huron County',
        'goderich': 'Huron County',
        'hensall': 'Huron County',
        'seaforth': 'Huron County',
        'kenora': 'Kenora District',
        'dryden': 'Kenora District',
        'red lake': 'Kenora District',
        'sioux lookout': 'Kenora District',
        'sarnia': 'Lambton County',
        'petrolia': 'Lambton County',
        'forest': 'Lambton County',
        'almonte': 'Lanark County',
        'smiths falls': 'Lanark County',
        'perth': 'Lanark County',
        'carleton place': 'Lanark County',
        'deseronto': 'Lennox and Addington County',
        'napanee': 'Lennox and Addington County',
        'northbrook': 'Lennox and Addington County',
        'little current': 'Manitoulin District',
        'gore bay': 'Manitoulin District',
        'wikwemikong': 'Manitoulin District',
        'huntsville': 'Muskoka District',
        'gravenhurst': 'Muskoka District',
        'bracebridge': 'Muskoka District',
        'beamsville': 'Niagara Region',
        'niagara falls': 'Niagara Region',
        'fort erie': 'Niagara Region',
        'grimsby': 'Niagara Region',
        'st. catharines': 'Niagara Region',
        'welland': 'Niagara Region',
        'niagara-on-the-lake': 'Niagara Region',
        'port colborne': 'Niagara Region',
        'mattawa': 'Nipissing District',
        'west nipissing': 'Nipissing District',
        'north bay': 'Nipissing District',
        'corbeil': 'Nipissing District',
        'campbellford': 'Northumberland County',
        'cobourg': 'Northumberland County',
        'port hope': 'Northumberland County',
        'warkworth': 'Northumberland County',
        'norwood': 'Peterborough County',
        'peterborough': 'Peterborough County',
        'apsley': 'Peterborough County',
        'lakefield': 'Peterborough County',
        'bourget': 'Prescott and Russell United Counties',
        'clarence creek': 'Prescott and Russell United Counties',
        'hawkesbury': 'Prescott and Russell United Counties',
        'plantagenet': 'Prescott and Russell United Counties',
        'embrun': 'Prescott and Russell United Counties',
        'st-albert': 'Prescott and Russell United Counties',
        'long sault': 'Stormont, Dundas and Glengarry United Counties', # Long Sault is in Stormont, Dundas and Glengarry
        'winchester': 'Stormont, Dundas and Glengarry United Counties', # Winchester is in Stormont, Dundas and Glengarry
        'cornwall': 'Stormont, Dundas and Glengarry United Counties', # Cornwall is in Stormont, Dundas and Glengarry
        'alexandria': 'Stormont, Dundas and Glengarry United Counties', # Alexandria is in Stormont, Dundas and Glengarry
        'maxville': 'Stormont, Dundas and Glengarry United Counties', # Maxville is in Stormont, Dundas and Glengarry
        'akwesasne': 'Stormont, Dundas and Glengarry United Counties', # Akwesasne is in Stormont, Dundas and Glengarry
        'waterloo': 'Waterloo Region',
        'kitchener': 'Waterloo Region',
        'cambridge': 'Waterloo Region',
        'elmira': 'Waterloo Region',
        'new hamburg': 'Waterloo Region',
        'woodstock': 'Oxford County',
        'ingersoll': 'Oxford County',
        'parry sound': 'Parry Sound District',
        'barrie': 'Simcoe County',
        'collingwood': 'Simcoe County',
        'wasaga beach': 'Simcoe County',
        'penetanguishene': 'Simcoe County',
        'midland': 'Simcoe County',
        'orillia': 'Simcoe County',
        'elmvale': 'Simcoe County',
        'beeton': 'Simcoe County',

    }

    for index, row in df.iterrows():
        home_name = row['LTC Home Name']
        city_lower = row['City'].lower()
        county = city_to_county_mapping.get(city_lower, row['City']) # Use mapped county or original city

        # Parse Google Rating
        google_rating_str = str(row['Google Rating']) # Ensure it's a string
        score = None
        summary = ""
        if "stars" in google_rating_str:
            match = re.match(r"(\d+\.?\d*)\s*stars\s*\((\d+)\s*reviews\)", google_rating_str)
            if match:
                score = float(match.group(1))
                summary = f"{match.group(2)} reviews"
            elif "Not Publicly Rated" in google_rating_str or "No reviews available" in google_rating_str:
                 score = None # Explicitly set to None if not rated
                 summary = google_rating_str
            else:
                try: # Fallback for simpler format like "3.5 stars" without reviews count
                    score = float(google_rating_str.split(' ')[0])
                    summary = "reviews available"
                except ValueError:
                    score = None
                    summary = google_rating_str
        else:
            # Handle cases where rating is just a number string or other non-star format (e.g., "4.0")
            try:
                score = float(google_rating_str)
                summary = "Rating available"
            except ValueError:
                score = None
                summary = google_rating_str


        # Parse Monthly Rates
        try:
            min_cost_str = str(row['Monthly Rate (Subsidized Basic)']).replace('$', '').replace(',', '')
            min_cost = float(min_cost_str)
        except (ValueError, TypeError):
            min_cost = 0 # Default or handle as None
        
        try:
            max_cost_str = str(row['Monthly Rate (Unsubsidized Private)']).replace('$', '').replace(',', '')
            max_cost = float(max_cost_str)
        except (ValueError, TypeError):
            max_cost = min_cost if min_cost != 0 else 99999 # Fallback or handle as a large number


        # Parse Room Types
        room_types = []
        if pd.notna(row['Licensed Beds (Basic)']) and row['Licensed Beds (Basic)'] > 0:
            room_types.append('Basic')
        if pd.notna(row['Licensed Beds (Semi-Private)']) and row['Licensed Beds (Semi-Private)'] > 0:
            room_types.append('Semi-Private')
        if pd.notna(row['Licensed Beds (Private)']) and row['Licensed Beds (Private)'] > 0:
            room_types.append('Private')
        
        # If no specific bed types are listed but beds exist, default to 'Various'
        if not room_types and (pd.notna(row['Licensed Beds (Basic)']) or pd.notna(row['Licensed Beds (Semi-Private)']) or pd.notna(row['Licensed Beds (Private)'])) and (row['Licensed Beds (Basic)'] > 0 or row['Licensed Beds (Semi-Private)'] > 0 or row['Licensed Beds (Private)'] > 0):
            room_types.append('Various')
        elif not room_types: # If no beds or bed info, still provide a placeholder
            room_types.append('N/A')


        # Parse Key Amenities
        amenities = []
        if pd.notna(row['Key Amenities']):
            # Split by comma, trim whitespace, and filter out empty strings
            amenities = [s.strip() for s in str(row['Key Amenities']).split(',') if s.strip()]

        # Generate a simple ID (you might want a more robust ID in a real app)
        home_id = hash(home_name) % (10**7) # Simple integer hash for uniqueness

        transformed_data.append({
            'id': home_id,
            'name': home_name,
            'type': "Long Term Care", # Assuming all are LTC for this CSV
            'province': "ON",
            'city': row['City'],
            'county': county,
            'address': row['Address'],
            'cost': {'min': min_cost, 'max': max_cost},
            'roomTypes': room_types,
            'subsidy': {
                'available': True, # Assuming all LTC homes have subsidy available by default
                'details': f"Subsidized by Ontario govt. based on income. Basic: ${min_cost_str}, Semi-Private: ${str(row['Monthly Rate (Unsubsidized Semi-Private)']).replace('$', '').replace(',', '')}, Private: ${max_cost_str}"
            },
            # Waitlist data is not in your CSV, providing a placeholder.
            # You would need to source this separately, e.g., from HCCSS reports if publicly available for individual homes.
            'waitlist': {'count': 'Varies', 'avgTimeMonths': 'Varies'},
            'ownership': row['Ownership Type'],
            'websiteUrl': row['Website'] if pd.notna(row['Website']) else None,
            'inspectionUrl': row['Official Inspection Reports'] if pd.notna(row['Official Inspection Reports']) else None,
            'socialSentiment': {'score': score, 'summary': summary},
            'sampleReviews': [] # Sample reviews would typically be static or pulled from another source
        })

    return transformed_data

if __name__ == "__main__":
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(script_dir, 'LTCH-Data.csv')

    # Output file will be created in the same directory where the script is run
    # You might want to adjust this path to point directly to your React src folder
    output_filename = os.path.join('/Users/harinderlabana/Code/ocss/src', 'ontarioCareHomes.js')

    try:
        df = pd.read_csv(csv_path)
        
        # Process the data
        react_data = clean_and_parse_data(df)

        # Write to JavaScript file
        with open(output_filename, 'w', encoding='utf-8') as f:
            f.write("const ontarioCareHomes = [\n")
            f.write(json.dumps(react_data, indent=2))
            f.write("\n];\n\nexport default ontarioCareHomes;\n")
        
        print(f"Successfully generated {output_filename}. You can now import this file into your React component.")

    except FileNotFoundError:
        print(f"Error: '{csv_path}' not found. Please make sure the CSV file is in the same directory as the script.")
    except Exception as e:
        print(f"An error occurred: {e}")

