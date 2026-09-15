#!/usr/bin/env python
"""
Script to seed University models with existing college data
"""
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Transcripts.settings')
django.setup()

from App.models import University, UniversityService, UniversityStat

def seed_universities():
    """Seed universities with sample data matching the frontend structure"""
    
    universities_data = {
        "bhaskar-pharmacy-college": {
            "short": "BPC",
            "logo": "https://via.placeholder.com/150?text=BPC",
            "heroImage": "partnerclg.png",
            "title": "Exclusive Transcript Services for BPC Students",
            "description": "Bhaskar Pharmacy College students can now apply for transcript and document services without visiting the college.",
            "stats": [
                {"value": "17,000+", "label": "Students Served"},
                {"value": "50+", "label": "Partner Universities"},
                {"value": "98%", "label": "Success Rate"},
                {"value": "24/7", "label": "Student Support"}
            ],
            "services": [
                "Marks Memorandum",
                "MOI Letter",
                "Transcripts",
                "Degree Certificate",
                "Verifications (for Organizations)",
                "Pharmacy Council Documents"
            ]
        },
        "joginpally-br-pharmacy-college": {
            "short": "JBRPC",
            "logo": "https://via.placeholder.com/150?text=JBRPC",
            "heroImage": "partnerclg.png",
            "title": "Exclusive Transcript Services for JBRPC Students",
            "description": "Joginpally B.R Pharmacy College students can now apply for their documents without visiting the college.",
            "stats": [
                {"value": "10,000+", "label": "Students Served"},
                {"value": "30+", "label": "Partner Universities"},
                {"value": "95%", "label": "Success Rate"},
                {"value": "24/7", "label": "Support"}
            ],
            "services": [
                "Marks Memorandum",
                "Transcripts",
                "Pharmacy Council Documents"
            ]
        },
        "jntu-hyderabad": {
            "short": "JNTUH",
            "logo": "https://via.placeholder.com/150?text=JNTUH",
            "heroImage": "partnerclg.png",
            "title": "Exclusive Transcript Services for JNTUH Students",
            "description": "Jawaharlal Nehru Technological University Hyderabad students can now apply for transcript and document services online.",
            "stats": [
                {"value": "25,000+", "label": "Students Served"},
                {"value": "100+", "label": "Partner Universities"},
                {"value": "99%", "label": "Success Rate"},
                {"value": "24/7", "label": "Support"}
            ],
            "services": [
                "Marks Memorandum",
                "Transcripts",
                "Degree Certificate",
                "MOI Letter",
                "Provisional Certificate"
            ]
        },
        "osmania-university": {
            "short": "OU",
            "logo": "https://via.placeholder.com/150?text=OU",
            "heroImage": "partnerclg.png",
            "title": "Exclusive Document Services for OU Students",
            "description": "Osmania University students can now apply for their academic documents without visiting the campus.",
            "stats": [
                {"value": "20,000+", "label": "Students Served"},
                {"value": "80+", "label": "Partner Universities"},
                {"value": "97%", "label": "Success Rate"},
                {"value": "24/7", "label": "Support"}
            ],
            "services": [
                "Marks Memorandum",
                "Transcripts",
                "Degree Certificate",
                "Migration Certificate"
            ]
        },
        "university-of-hyderabad": {
            "short": "UoH",
            "logo": "https://via.placeholder.com/150?text=UoH",
            "heroImage": "partnerclg.png",
            "title": "Exclusive Transcript Services for UoH Students",
            "description": "University of Hyderabad students can now apply for transcript and evaluation services online.",
            "stats": [
                {"value": "12,000+", "label": "Students Served"},
                {"value": "60+", "label": "Partner Universities"},
                {"value": "98%", "label": "Success Rate"},
                {"value": "24/7", "label": "Support"}
            ],
            "services": [
                "Transcripts",
                "Degree Certificate",
                "MOI Letter",
                "Verifications"
            ]
        }
    }
    
    print("Seeding universities...")
    
    for uni_id, data in universities_data.items():
        # Check if university already exists
        if University.objects.filter(short=data['short']).exists():
            print(f"University {data['short']} already exists, skipping...")
            continue
            
        # Create university
        university = University.objects.create(
            short=data['short'],
            logo=data['logo'],
            heroImage=data['heroImage'],
            title=data['title'],
            description=data['description']
        )
        
        # Create services
        for service_name in data['services']:
            UniversityService.objects.create(
                university=university,
                name=service_name
            )
        
        # Create stats
        for stat in data['stats']:
            UniversityStat.objects.create(
                university=university,
                value=stat['value'],
                label=stat['label']
            )
        
        print(f"Created university: {university.short}")
    
    print("Seeding completed!")

if __name__ == "__main__":
    seed_universities()
