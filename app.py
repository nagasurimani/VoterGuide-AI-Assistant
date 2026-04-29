import streamlit as st
import google.generativeai as genai
import os
import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the page
st.set_page_config(
    page_title="VoterGuide AI Assistant", 
    page_icon="🗳️", 
    layout="wide"
)

# Custom CSS for government-style layout
css = """
<style>
    /* Top Banner */
    .banner {
        width: 100%;
        height: 12px;
        background: linear-gradient(to bottom, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    /* Logo Container */
    .logo-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #004B87;
        padding: 10px 20px;
        margin-top: 15px;
        border-radius: 5px;
        border: 2px solid #ddd;
    }
    .logo-container img {
        height: 50px;
    }
    /* Button Styling */
    div.stButton > button:first-child {
        background-color: #000080 !important;
        color: white !important;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-weight: bold;
    }
    /* Card Layouts */
    .st-emotion-cache-1r6slb0, .st-emotion-cache-1v0mbdj {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        color: #333;
    }
</style>
<div class="banner"></div>
<div class="logo-container">
    <img src="https://voters.eci.gov.in/assets/images/eci-logo-white.png" alt="ECI Logo">
    <img src="https://voters.eci.gov.in/assets/images/G20-Logo.png" alt="G20 Logo">
</div>
"""
st.markdown(css, unsafe_allow_html=True)

def calculate_election_progress():
    start_date = datetime.date(2024, 6, 1) 
    election_date = datetime.date(2026, 4, 1) 
    today = datetime.date.today()
    if today >= election_date:
        return 100
    if today <= start_date:
        return 0
    total_days = (election_date - start_date).days
    days_passed = (today - start_date).days
    return int((days_passed / total_days) * 100)

def initialize_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        st.sidebar.warning("⚠️ GEMINI_API_KEY is not set in the .env file.")
        return None
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=(
            "You are a professional, neutral, and helpful AI assistant for Indian voters. "
            "Your purpose is to answer questions about voting procedures, forms, "
            "voter eligibility, and civic duties clearly and factually. "
            "Never express personal political opinions, biases, or endorse any candidates."
        )
    )

def check_eligibility(dob):
    election_date = datetime.date(2026, 4, 1)
    age = election_date.year - dob.year - ((election_date.month, election_date.day) < (dob.month, dob.day))
    if age >= 18:
        st.success(f"✅ You will be **{age} years old** by April 2026. You are eligible to vote!")
    else:
        st.error(f"❌ You will be **{age} years old** by April 2026. You must be 18 to vote.")

def find_polling_station(pin_code, model):
    if len(str(pin_code)) == 6:
        with st.spinner("Finding polling station information..."):
            prompt = f"I am a voter in India with PIN code {pin_code}. Briefly tell me the standard administrative process to find my polling booth in this region, and keep it under 3 sentences."
            try:
                response = model.generate_content(prompt)
                st.write(response.text)
                st.markdown("**[🔗 Official ECI Polling Station Locator](https://electoralsearch.eci.gov.in/)**")
            except Exception as e:
                st.error("Could not fetch polling station data. Please try again.")
    else:
        st.warning("Please enter a valid 6-digit PIN code.")

def main():
    st.title("🗳️ Voter Registration & Education Portal")
    st.markdown("Your accessible and highly reliable guide to civic engagement for the upcoming State Elections.")

    # Model Init
    model = initialize_gemini()
    if model:
        st.session_state.gemini_model = model

    # --- Sidebar Configuration ---
    st.sidebar.title("Navigation")
    voter_type = st.sidebar.radio(
        "Voter Services",
        ("New Voter", "Existing Voter")
    )
    
    st.sidebar.markdown("---")
    st.sidebar.subheader("April 2026 State Elections")
    progress_val = calculate_election_progress()
    st.sidebar.progress(progress_val, text=f"Progress: {progress_val}%")
    st.sidebar.caption("Estimated timeline leading up to the April 2026 elections.")

    # --- Main Content Area ---
    if voter_type == "New Voter":
        st.header("Welcome, New Voter! 🎉")
        
        # Dynamic Eligibility Check
        st.subheader("1. Eligibility Check")
        dob = st.date_input("Enter your Date of Birth:")
        if st.button("Check Eligibility"):
            check_eligibility(dob)

        # Form 6 details
        st.markdown("""
        ---
        ### 📋 Document Checklist for Form 6
        To register to vote, you need to fill out **Form 6**. Ensure you have clear copies of:
        """)
        st.checkbox("📄 **Aadhaar Card** (or alternative age proof)")
        st.checkbox("🖼️ **Passport-size Photograph** (recent, colored)")
        st.checkbox("🏠 **Address Proof** (e.g., utility bill, bank passbook, or Aadhaar)")
        st.info("💡 Apply online through the official Election Commission portal or the Voter Helpline App.")
        
    else:
        st.header("Welcome back, Existing Voter! 🗳️")
        st.markdown("""
        Make sure your voter details are up to date before the next election cycle.
        
        #### Quick Guide to Forms:
        - **Need to correct details?** Use **Form 8**.
        - **Need to shift your constituency?** Use **Form 8**.
        - **Need to link Aadhaar?** Use **Form 6B**.
        - **Need to permanently delete a name?** Use **Form 7**.
        """)

    st.markdown("---")
    
    # --- Special Intensive Revision Section ---
    st.subheader("📅 Special Intensive Revision (SIR) 2026")
    st.markdown("""
    **Timeline & Process:**
    1. **Registration:** Submit Form 6 before the draft roll publication.
    2. **Verification:** Booth Level Officer (BLO) performs field verification.
    3. **EPIC Generation:** Voter ID is approved and mailed to your address.
    """)

    st.markdown("---")
    
    # --- Polling Station Finder ---
    st.subheader("📍 Polling Station Finder")
    st.markdown("Enter your PIN code to get guidance on your nearest polling booth.")
    col1, col2 = st.columns([1, 2])
    with col1:
        pin_code = st.text_input("6-digit PIN Code", max_chars=6)
        if st.button("Find Polling Station"):
            if model and pin_code:
                find_polling_station(pin_code, model)
            elif not model:
                st.error("AI service is unavailable. Please configure GEMINI_API_KEY.")
            else:
                st.warning("Please enter a PIN code.")

    st.markdown("---")
    
    # --- Chat Interface ---
    st.subheader("💬 Ask VoterGuide AI")
    st.markdown("If you have any questions about the voting process or forms, ask our neutral AI below.")
    
    if "messages" not in st.session_state:
        st.session_state.messages = []

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if prompt := st.chat_input("E.g., How do I check if my name is on the electoral roll?"):
        st.chat_message("user").markdown(prompt)
        st.session_state.messages.append({"role": "user", "content": prompt})

        if model:
            with st.chat_message("assistant"):
                message_placeholder = st.empty()
                try:
                    history = []
                    for m in st.session_state.messages[:-1]:
                        role = "model" if m["role"] == "assistant" else "user"
                        history.append({"role": role, "parts": [m["content"]]})
                    
                    chat = model.start_chat(history=history)
                    response = chat.send_message(prompt, stream=True)
                    
                    full_response = ""
                    for chunk in response:
                        full_response += chunk.text
                        message_placeholder.markdown(full_response + "▌")
                    message_placeholder.markdown(full_response)
                    
                    st.session_state.messages.append({"role": "assistant", "content": full_response})
                except Exception as e:
                    st.error(f"Error communicating with AI: {e}")
        else:
            st.error("AI is unavailable right now. Please ensure the GEMINI_API_KEY is added to the .env file.")

if __name__ == "__main__":
    main()
