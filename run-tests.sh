#!/bin/bash

# eKYC Test Runner Script
# Run this script to execute all tests

echo "======================================"
echo "  eKYC Test Suite Runner"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the project root
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Function to run frontend tests
run_frontend_tests() {
    echo -e "${YELLOW}Running Frontend Tests...${NC}"
    echo "--------------------------------------"
    cd frontend
    npm test -- --run
    FRONTEND_EXIT=$?
    cd ..
    echo ""
    return $FRONTEND_EXIT
}

# Function to run backend tests
run_backend_tests() {
    echo -e "${YELLOW}Running Backend Tests...${NC}"
    echo "--------------------------------------"
    cd backend
    npm test -- --run
    BACKEND_EXIT=$?
    cd ..
    echo ""
    return $BACKEND_EXIT
}

# Function to run coverage
run_coverage() {
    echo -e "${YELLOW}Generating Coverage Reports...${NC}"
    echo "--------------------------------------"
    
    echo "Frontend Coverage:"
    cd frontend
    npm run test:coverage -- --run
    cd ..
    
    echo ""
    echo "Backend Coverage:"
    cd backend
    npm run test:coverage -- --run
    cd ..
    echo ""
}

# Parse command line arguments
case "$1" in
    "frontend")
        run_frontend_tests
        exit $?
        ;;
    "backend")
        run_backend_tests
        exit $?
        ;;
    "coverage")
        run_coverage
        ;;
    *)
        # Run all tests
        run_frontend_tests
        FRONTEND_RESULT=$?
        
        run_backend_tests
        BACKEND_RESULT=$?
        
        echo "======================================"
        echo "  Test Results Summary"
        echo "======================================"
        
        if [ $FRONTEND_RESULT -eq 0 ]; then
            echo -e "Frontend: ${GREEN}✓ PASSED${NC}"
        else
            echo -e "Frontend: ${RED}✗ FAILED${NC}"
        fi
        
        if [ $BACKEND_RESULT -eq 0 ]; then
            echo -e "Backend:  ${GREEN}✓ PASSED${NC}"
        else
            echo -e "Backend:  ${RED}✗ FAILED${NC}"
        fi
        
        echo ""
        
        # Exit with error if any test failed
        if [ $FRONTEND_RESULT -ne 0 ] || [ $BACKEND_RESULT -ne 0 ]; then
            exit 1
        fi
        
        echo -e "${GREEN}All tests passed!${NC}"
        echo ""
        echo "To generate coverage reports, run: ./run-tests.sh coverage"
        ;;
esac
